import vscode from 'vscode';

export function isLuaGLM() {
    return get('luaGLM');
}

export function isMultiThreadIndexing() {
    return get('multiThreadIndexing');
}

function get(key) {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get(key);
}