import vscode from 'vscode';

export default class DiagnosticIndex {
    constructor() {
        this.collection = vscode.languages.createDiagnosticCollection('natives');
    }

    clear(document) {
        this.collection.delete(document.uri);
    }

    set(document, diagnostics) {
        if (diagnostics.length === 0) {
            this.clear(document);

            return;
        }

        this.collection.set(document.uri, diagnostics);
    }

    get(document) {
        return this.collection.get(document.uri) || [];
    }

    find(document, range) {
        const diagnostics = this.get(document);

        return diagnostics.find(diagnostic => {
            return diagnostic.range.isEqual(range);
        });
    }

    resolveCodeAction(document, range) {
        const diagnostic = this.find(document, range);

        if (!diagnostic || diagnostic.replacement === false) return false;

		const action = new vscode.CodeAction(`Replace with ${diagnostic.replacement}`, vscode.CodeActionKind.QuickFix);

        action.edit = new vscode.WorkspaceEdit();
		action.edit.replace(document.uri, diagnostic.range, diagnostic.replacement);

		return action;
    }

    keys() {
        const uris = [];

        this.forEach(uri => {
            uris.push(uri);
        });

        return uris;
    }

    forEach(callback) {
        this.collection.forEach(callback);
    }
}