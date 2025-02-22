import vscode from 'vscode';

export function eventDefinitions() {
    return get('eventDefinitions');
}

export function showInlineHints() {
    return get('showInlineHints');
}

export function showSyntaxErrors() {
    return get('showSyntaxErrors');
}

export function provideCodeActions() {
    return get('provideCodeActions');
}

export function provideDiagnostics() {
    return get('provideDiagnostics');
}

export function disableAllDiagnostics() {
    return get('disableAllDiagnostics');
}

export function diagnosticDebounce() {
    const val = get('diagnosticDebounce');

    if (!val) return 750;

    return val;
}

export function excludeFilesRegex() {
    let val = get('excludeFilesRegex')?.trim();

    if (!val) {
        return null;
    }

    // Strip leading and trailing slashes
    if (val.startsWith('/') && val.endsWith('/')) {
        val = val.substring(1, val.length - 1);
    }

    return new RegExp(val, 'i');
}

function get(key) {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get(key);
}