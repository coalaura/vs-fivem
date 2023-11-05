import vscode from 'vscode';

export function isLuaGLM() {
    return get('luaGLM');
}

function get(key) {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get(key);
}