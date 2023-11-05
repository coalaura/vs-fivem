import vscode from 'vscode';
import { existsSync } from 'fs';
import { join } from 'path';

import { matchAll } from '../helper/regexp.js';
import { getFileContext } from '../helper/natives.js';

// Walk up the directory tree until we find a resource manifest file.
function resolveResourceName(document) {
    const base = document.fileName.split(/[\\\/]/);

    while (base.length > 1) {
        base.pop();

        const manifest = join(base.join('/'), 'fxmanifest.lua'),
            legacy = join(base.join('/'), '__resource.lua');

        if (existsSync(manifest) || existsSync(legacy)) {
            return base.pop();
        }
    }

    return null;
}

export default class DefinitionIndex {
    constructor() {
        this.definitions = {};
        this.events = {
            client: {},
            server: {}
        };

        this.resources = {};
    }

    clear() {
        this.definitions = {};

        this.resources = {};
    }

    delete(name) {
        delete this.definitions[name];

        for (const resource in this.resources) {
            delete this.resources[resource][name];
        }
    }

    rebuild(document) {
        const name = document.fileName,
            resource = resolveResourceName(document),
            context = getFileContext(name),
            text = document.getText();

        this.delete(name);

        const globals = {},
            locals = {};

        const definitions = matchAll(/(local )?function ([\w:.]+) ?\(.*?\)(?=$| )/gm, text);

        for (const definition of definitions) {
            const local = definition[1] === 'local',
                name = definition[2];

            const position = document.positionAt(definition.index);

            if (local) {
                locals[name] = {
                    line: position.line,
                    character: position.character,
                    length: definition[0].length
                };
            } else {
                globals[name] = {
                    line: position.line,
                    character: position.character,
                    length: definition[0].length
                };
            }
        }

        if (context === 'client' || context === 'server') {
            const eventRegistrations = matchAll(/RegisterNetEvent\((["'])(.+?)\1\)/g, text);

            for (const registration of eventRegistrations) {
                const event = registration[2];

                const position = document.positionAt(registration.index);

                this.events[context][event] = {
                    file: name,
                    line: position.line,
                    character: position.character,
                    length: registration[0].length
                };
            }
        }

        this.definitions[name] = {
            name: name,
            context: context,
            resource: resource,
            globals: globals,
            locals: locals
        };

        this.resources[resource] = this.resources[resource] || {};
        this.resources[resource][name] = true;
    }

    resolveDefinition(document, position) {
        // Local and global function definitions.
        {
            const wordRange = document.getWordRangeAtPosition(position, /[\w.:]+/),
                word = wordRange ? document.getText(wordRange) : false;

            if (word) {
                // Don't resolve if we hovered over the base of a member access.
                if (word.includes('.') || word.includes(':')) {
                    const base = word.split(/\.|:/).shift();

                    const partRange = document.getWordRangeAtPosition(position, /[\w]+/),
                        part = partRange ? document.getText(partRange) : false;

                    if (base === part) return null;
                }

                const name = document.fileName,
                    resource = resolveResourceName(document),
                    context = getFileContext(name);

                // Is the function defined in this file?
                if (name in this.definitions) {
                    const definition = this.definitions[name],
                        local = definition.locals[word],
                        global = definition.globals[word];

                    if (local && local.line < position.line) {
                        return this.toLocation(name, local);
                    } else if (global && global.line !== position.line) {
                        return this.toLocation(name, global);
                    }
                }

                // Is the function defined in another file in this resource?
                if (!(resource in this.resources)) return null;

                for (const file in this.resources[resource]) {
                    if (file === name) continue;

                    const def = this.definitions[file];

                    if (!def || (def.context !== context && def.context !== 'shared')) continue;

                    const global = def.globals[word];

                    if (!global) continue;

                    return this.toLocation(file, global);
                }
            }
        }

        // Event registrations.
        {
            const wordRange = document.getWordRangeAtPosition(position, /(["'])(.+?)\1/),
                word = wordRange ? document.getText(wordRange) : false;

            if (word) {
                const name = word.slice(1, -1);

                // Don't resolve if we hovered over the base of a member access.
                if (name.match(/[^\w]/)) {
                    const last = name.split(/[^\w]+/).pop();

                    const partRange = document.getWordRangeAtPosition(position, /[\w]+/),
                        part = partRange ? document.getText(partRange) : false;

                    if (last !== part) return null;
                }

                const context = getFileContext(name),
                    inverseContext = context === 'client' ? 'server' : 'client';

                if (name in this.events[inverseContext]) {
                    const event = this.events[inverseContext][name];

                    return this.toLocation(event.file, event);
                }

                // Triggering an event from the same context is valid, but a bit ugly.
                if (name in this.events[context]) {
                    const event = this.events[context][name];

                    return this.toLocation(event.file, event);
                }
            }
        }

        return null;
    }

    toLocation(fileName, func) {
        const file = vscode.Uri.file(fileName);

        const from = new vscode.Position(func.line, func.character),
            to = new vscode.Position(func.line, func.character + func.length);

        return new vscode.Location(file, new vscode.Range(from, to));
    }
}