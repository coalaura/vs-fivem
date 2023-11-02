import vscode from 'vscode';

import ColorDecorator from './classes/color-decorator.js';

const decorator = new ColorDecorator();

function updateDecorationsIfNeeded(document) {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) return;

    document = document || activeEditor.document;

    if (!document || activeEditor.document !== document) return;

    if (document.languageId !== 'lua') {
        decorator.clear();

        return;
    }

    decorator.updateDecorations(activeEditor, document);
}

export function registerColorDecorator(context) {
    updateDecorationsIfNeeded(false);

    vscode.window.onDidChangeActiveTextEditor(() => {
        updateDecorationsIfNeeded(false);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        updateDecorationsIfNeeded(event.document);
    }, null, context.subscriptions);
}