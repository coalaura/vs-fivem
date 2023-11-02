import vscode from 'vscode';
import { join } from 'path';
import { existsSync } from 'fs';

import { getFileContext } from './natives.js';

const index = {};

function rebuildDocumentIndex(document) {
    const name = document.fileName,
        resource = _findResourceName(document),
        context = getFileContext(name);

    delete index[name];

    const globals = {},
        locals = {};

    const text = document.getText();

    const regex = /(local )?function ([\w:.]+) ?\(.*?\)(?=$| )/gm;

    let m;

    while ((m = regex.exec(text)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        const local = m[1] === 'local',
            name = m[2];

        const position = document.positionAt(m.index);

        if (local) {
            locals[name] = {
                line: position.line,
                character: position.character,
                length: m[0].length
            };
        } else {
            globals[name] = {
                line: position.line,
                character: position.character,
                length: m[0].length
            };
        }
    }

    index[name] = {
        name: name,
        context: context,
        resource: resource,
        globals: globals,
        locals: locals,
    };
}

export function buildIndex() {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Indexing Workspace'
    }, async (progress) => {
        progress.report({
            increment: 0
        });

        const files = await vscode.workspace.findFiles('**/*.lua', '**/node_modules/**');

        for (const [index, file] of files.entries()) {
            const document = await vscode.workspace.openTextDocument(file);

            rebuildDocumentIndex(document);

            const percentage = ((index / files.length) * 100).toFixed(1);

            progress.report({
                message: percentage + '%',
                increment: 100 / files.length
            });
        }

        progress.report({ increment: 100 });
    });
}

function resolveDocumentDefinition(document, position) {
    const fileName = document.fileName,
        resource = _findResourceName(document),
        context = getFileContext(fileName);

    const functions = _getFunctionsInContext(fileName, resource, context);

    const wordRange = document.getWordRangeAtPosition(position, /[\w.:]+/),
        word = wordRange ? document.getText(wordRange) : false;

    if (!word) return null;

    // Don't resolve if we hovered over the base of a member access.
    if (word.includes('.') || word.includes(':')) {
        const base = word.split(/\.|:/).shift();

        const partRange = document.getWordRangeAtPosition(position, /[\w]+/),
            part = partRange ? document.getText(partRange) : false;

        if (base === part) return null;
    }

    const local = functions.locals[word],
        globalFile = functions.globals.find(entry => entry.globals[word]),
        global = globalFile ? globalFile.globals[word] : null;

    if (local && local.line < position.line) {
        const from = new vscode.Position(local.line, local.character),
            to = new vscode.Position(local.line, local.character + local.length);

        return new vscode.Location(document.uri, new vscode.Range(from, to));
    } else if (global && (globalFile.name !== fileName || global.line !== position.line)) {
        const file = vscode.Uri.file(globalFile.name);

        const from = new vscode.Position(global.line, global.character),
            to = new vscode.Position(global.line, global.character + global.length);

        return new vscode.Location(file, new vscode.Range(from, to));
    }

    return null;
}

export function registerDefinitionProvider(context) {
    context.subscriptions.push(
        vscode.languages.registerDefinitionProvider('lua', {
            provideDefinition(document, position) {
                return resolveDocumentDefinition(document, position);
            }
        })
    );

    // Listen for any changes and deletions.
    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(event => {
            if (event.document.isUntitled) return;

            rebuildDocumentIndex(event.document);
        })
    );
    context.subscriptions.push(
        vscode.workspace.onDidDeleteFiles(event => {
            for (const file of event.files) {
                delete index[file.fsPath];
            }
        })
    );
}

function _getFunctionsInContext(name, resource, context) {
    const document = index[name];

    const locales = document ? document.locals : {};

    const globals = Object.values(index).filter(entry => entry.resource === resource && (entry.context === context || entry.context === 'shared'));

    return {
        locals: locales,
        globals: globals
    }
}

// Walk up the directory tree until we find a resource manifest file.
function _findResourceName(document) {
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