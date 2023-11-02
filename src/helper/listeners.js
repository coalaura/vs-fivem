import vscode from 'vscode';

export function onAnyDocumentChange(context, callback) {
    const activeEditor = vscode.window.activeTextEditor;

	if (activeEditor && activeEditor.document) {
		callback(activeEditor.document);
	}

	vscode.window.onDidChangeActiveTextEditor(editor => {
		if (!editor) return;

        callback(editor.document);
	}, null, context.subscriptions);

	vscode.workspace.onDidChangeTextDocument(e => {
		callback(e.document);
	}, null, context.subscriptions);
}