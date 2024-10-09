import vscode from 'vscode';

import { readFile } from 'fs/promises';

import { eventDefinitions } from './helper/config.js';
import index from './singletons/definition-index.js';

export function buildFullIndex() {
    if (!eventDefinitions()) return;

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Indexing Workspace'
    }, async (progress) => {
        progress.report({
            message: 'Collecting',
            increment: 0
        });

        const files = await vscode.workspace.findFiles('**/*.lua', '**/node_modules/**'),
            batch = Math.ceil(files.length / 20);

        let indexed = -1;

        function report() {
            indexed++;

            if (indexed % batch === 0) {
                const percentage = ((indexed / files.length) * 100).toFixed(1);

                progress.report({
                    message: percentage + '%',
                    increment: 100 / files.length
                });
            }
        }

        for (const file of files) {
            const text = await readFile(file.fsPath, 'utf8');

            index.rebuild(file.fsPath, text);

            report();
        }

        progress.report({ increment: 100 });
    });
}

export function registerDefinitionProvider(context) {
    vscode.languages.registerDefinitionProvider('lua', {
        provideDefinition(document, position) {
            return index.resolveDefinition(document, position);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        const document = event.document;

        if (!document || document.isUntitled) return;

        index.rebuild(document.fileName, document.getText());
    }, null, context.subscriptions);

    vscode.workspace.onDidDeleteFiles(event => {
        for (const file of event.files) {
            index.delete(file.fsPath);
        }
    }, null, context.subscriptions);
}
