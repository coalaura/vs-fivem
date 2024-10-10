import vscode from 'vscode';
import { join } from 'path';
import { existsSync, readFileSync, writeFileSync, statSync, mkdirSync } from 'fs';

import { getFileContext } from '../helper/natives.js';
import { matchAll } from '../helper/regexp.js';
import logger from './logger.js';

class DefinitionIndex {
    constructor(context) {
        this.version = 1;

        this.directory = context.storagePath || context.globalStoragePath;
        this.path = join(this.directory, 'events.json');

        this.files = {};
        this.events = {
            client: {},
            server: {}
        };
    }

    load() {
        if (!existsSync(this.path)) {
            return;
        }

        const contents = readFileSync(this.path, 'utf8');

        try {
            const data = JSON.parse(contents);

            if (data.version !== this.version) {
                return;
            }

            this.files = data.files;
            this.events = data.events;

            for (const path in this.files) {
                if (!existsSync(path)) {
                    this.delete(path);
                }
            }

            logger.log('Definition index loaded from disk.');
        } catch { }
    }

    store() {
        if (!existsSync(this.directory)) {
            mkdirSync(this.directory, { recursive: true });
        }

        writeFileSync(this.path, JSON.stringify({
            version: this.version,
            files: this.files,
            events: this.events
        }));
    }

    mtime(path) {
        try {
            const stat = statSync(path);

            if (!stat) return 0;

            return stat.mtime.getTime();
        } catch {
            return 0;
        }
    }

    delete(path) {
        const context = getFileContext(path);

        delete this.files[path];

        if (context in this.events) {
            for (const eventName in this.events[context]) {
                const event = this.events[context][eventName];

                if (event.file === path) {
                    delete this.events[context][event];
                }
            }
        }
    }

    rebuild(path, persist = false) {
        const indexed = this.files[path],
            mtime = this.mtime(path);

        if (indexed === mtime) {
            return;
        }

        const context = getFileContext(path);

        this.delete(path);

        if (context !== 'client' && context !== 'server' || !existsSync(path)) return;

        const text = readFileSync(path, 'utf8');

        if (!text) return;

        const lines = text.split(/\r?\n/);

        for (let line = 0; line < lines.length; line++) {
            const lineText = lines[line];

            for (const match of lineText.matchAll(/(?:Register(?:Net|Client|Server)Event|AddEventHandler)\((["'])(.+?)\1/g)) {
                const column = match.index,
                    event = match[2];

                this.events[context][event] = {
                    file: path,
                    line: line + 1,
                    column: column
                };
            }
        }

        if (persist) {
            this.files[path] = mtime;

            this.store();
        }
    }

    resolveDefinition(document, position) {
        const wordRange = document.getWordRangeAtPosition(position, /(["'])(.+?)\1/),
            word = wordRange ? document.getText(wordRange) : false;

        if (!word) return null;

        const context = getFileContext(document.fileName),
            name = word.slice(1, -1);

        let searchContext;

        // Get context based on function name
        {
            const funcRange = document.getWordRangeAtPosition(wordRange.start, /[\w]+\(/),
                func = funcRange ? document.getText(funcRange) : false;

            if (func) {
                const funcName = func.trim('(');

                switch (funcName) {
                    case 'TriggerServerEvent':
                        searchContext = 'server';

                        break;
                    case 'TriggerClientEvent':
                        searchContext = 'client';

                        break;
                    case 'TriggerEvent':
                        searchContext = context;

                        break;
                }
            }
        }

        // Otherwise use inverse file context
        if (!searchContext) {
            searchContext = context === 'client' ? 'server' : 'client';
        }

        if (name in this.events[searchContext]) {
            const event = this.events[searchContext][name];

            return this.toLocation(event.file, event);
        }

        // Triggering an event from the same context is valid, but a bit ugly.
        if (name in this.events[context]) {
            const event = this.events[context][name];

            return this.toLocation(event.file, event);
        }

        return null;
    }

    toLocation(fileName, event) {
        const file = vscode.Uri.file(fileName),
            start = new vscode.Position(event.line - 1, event.column),
            end = new vscode.Position(event.line - 1, event.column + 1);

        return new vscode.Location(file, new vscode.Range(start, end));
    }
}

let index;

export function getIndex() {
    return index;
}

export function initializeEventIndex(context) {
    index = new DefinitionIndex(context);

    index.load();
}