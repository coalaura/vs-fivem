import vscode from 'vscode';

import { readFileSync } from 'fs';

import DefinitionIndex from './classes/definition-index.js';

const index = new DefinitionIndex();

export function buildFullIndex() {
    index.clear();

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Indexing Workspace'
    }, async (progress) => {
        progress.report({
            message: 'Collecting',
            increment: 0
        });

        const files = await vscode.workspace.findFiles('**/*.lua', '**/node_modules/**');

        let indexed = -1;

        function report() {
            indexed++;

            const percentage = ((indexed / files.length) * 100).toFixed(1);

            progress.report({
                message: percentage + '%',
                increment: 100 / files.length
            });
        }

        for (const file of files) {
            const text = readFileSync(file.fsPath, 'utf8');

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
