import vscode from 'vscode';

export function isLuaGLM() {
    return get('luaGLM');
}

export function searchEventUsages() {
    return get('searchEventUsages');
}

export function showInlineHints() {
    return get('showInlineHints');
}

export function showPerformanceHints() {
    return get('showPerformanceHints');
}

function get(key) {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get(key);
}