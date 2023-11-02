import vscode from 'vscode';

export default class Diagnostic extends vscode.Diagnostic {
    constructor(range, message, severity, replacement = false) {
        super(range, message, severity);

        this.replacement = replacement;
    }
}