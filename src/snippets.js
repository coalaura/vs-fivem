import vscode from 'vscode';

import snippets from './data/snippets.js';

function pressEnter() {
    vscode.commands.executeCommand('default:type', {
        text: '\n'
    });
}

function insertSnippet() {
    const editor = vscode.window.activeTextEditor,
        document = editor ? editor.document : null;

    if (!document) return false;

    const cursor = editor.selection.start,
        before = document.positionAt(document.offsetAt(cursor) - 1);

    const wordRange = document.getWordRangeAtPosition(before),
        word = wordRange ? document.getText(wordRange) : null;

    if (!word) return false;

    const snippet = snippets[word] || null;

    if (!snippet) return false;

    const snippetString = new vscode.SnippetString(snippet);

    editor.insertSnippet(snippetString, wordRange);

    return true;
}

export function registerSnippetCommands(context) {
    vscode.commands.registerCommand('vs-fivem.insertSnippet', () => {
        if (!insertSnippet()) {
            pressEnter();
        }
    }, null, context.subscriptions);

    vscode.commands.executeCommand('setContext', 'snippetHandlerReady', true);
}