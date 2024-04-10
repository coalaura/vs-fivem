import vscode from 'vscode';

import { getFileContext } from '../helper/natives.js';
import { extractAllFunctionCalls } from '../helper/lua.js';

const eventRegisters = [
    'RegisterNetEvent',
    'RegisterServerEvent',
    'RegisterClientEvent',
    'AddEventHandler'
];

class DefinitionIndex {
    constructor() {
        this.events = {
            client: {},
            server: {}
        };
    }

    delete(name) {
        const context = getFileContext(name);

        if (context in this.events) {
            for (const eventName in this.events[context]) {
                const event = this.events[context][eventName];

                if (event.file === name) {
                    delete this.events[context][event];
                }
            }
        }
    }

    rebuild(name, text) {
        const context = getFileContext(name);

        this.delete(name);

        if (context !== 'client' && context !== 'server') return;

        const calls = extractAllFunctionCalls(text, false, eventRegisters);

        for (const call of calls) {
            if (!call.arguments.length) continue;

            const event = call.arguments[0].value.replace(/^['"]|['"]$/gm, ''),
                position = call.position;

            this.events[context][event] = {
                file: name,
                line: position.line,
                character: position.character
            };
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
            start = new vscode.Position(event.line - 1, event.character),
            end = new vscode.Position(start.line, start.character + 1);

        return new vscode.Location(file, new vscode.Range(start, end));
    }
}

const index = new DefinitionIndex();

export default index;