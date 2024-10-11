import vscode from 'vscode';

import { readFile } from 'fs/promises';
import glob from 'fast-glob';

import { eventDefinitions } from './helper/config.js';
import { getIndex } from './singletons/definition-index.js';
import logger from './singletons/logger.js';

let timeouts = {};

export function buildFullIndex() {
    if (!eventDefinitions()) return;

    const workspaces = vscode.workspace.workspaceFolders;

    if (!workspaces || !workspaces.length) {
        logger.log('Skipped workspace indexing as no workspace is open.');

        return;
    }

    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Indexing Workspace'
    }, async (progress) => {
        progress.report({
            message: 'Collecting',
            increment: 0
        });

        const _start = Date.now();

        const files = await glob('**/*.lua', {
            cwd: workspaces[0].uri.fsPath,
            ignore: ['**/node_modules/**', '**/.git/**'],
        });

        const batch = Math.ceil(files.length / 20);

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

        const index = getIndex();

        for (const path of files) {
            index.rebuild(path, false);

            report();
        }

        index.store();

        logger.log(`Indexed ${files.length} files in ${Date.now() - _start}ms.`);

        progress.report({ increment: 100 });
    });
}

function debounceIndexRebuild(path) {
    clearTimeout(timeouts[path]);

    timeouts[path] = setTimeout(() => {
        const index = getIndex();

        index?.rebuild(path, true);
    }, 500);
}

export function registerDefinitionProvider(context) {
    vscode.languages.registerDefinitionProvider('lua', {
        provideDefinition(document, position) {
            const index = getIndex();

            return index?.resolveDefinition(document, position);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        const document = event.document;

        if (!document || document.isUntitled) return;

        debounceIndexRebuild(document.fileName);
    }, null, context.subscriptions);

    vscode.workspace.onDidDeleteFiles(event => {
        for (const file of event.files) {
            clearTimeout(timeouts[file.fsPath]);

            const index = getIndex();

            index?.delete(file.fsPath);
        }
    }, null, context.subscriptions);
}
