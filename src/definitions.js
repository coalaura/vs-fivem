import vscode from 'vscode';

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
            increment: 0
        });

        const files = await vscode.workspace.findFiles('**/*.lua', '**/node_modules/**');

        for (const [i, file] of files.entries()) {
            const document = await vscode.workspace.openTextDocument(file);

            index.rebuild(document);

            const percentage = ((i / files.length) * 100).toFixed(1);

            progress.report({
                message: percentage + '%',
                increment: 100 / files.length
            });
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
        if (event.document.isUntitled) return;

        index.rebuild(event.document);
    }, null, context.subscriptions);

    vscode.workspace.onDidDeleteFiles(event => {
        for (const file of event.files) {
            index.delete(file.fsPath);
        }
    }, null, context.subscriptions);
}
