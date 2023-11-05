import vscode from 'vscode';

import DefinitionIndex from './classes/definition-index.js';
import { isMultiThreadIndexing } from './helper/config.js';

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

        report();

        if (isMultiThreadIndexing()) {
            // Significantly faster but heavy on the CPU
            await Promise.all(files.map(async file => {
                const document = await vscode.workspace.openTextDocument(file);

                index.rebuild(document);

                report();
            }));
        } else {
            // Slower but lighter on the CPU
            for (const file of files) {
                const document = await vscode.workspace.openTextDocument(file);

                index.rebuild(document);

                report();
            }
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
