import vscode from 'vscode';

function convertJSONToLua() {
    const editor = vscode.window.activeTextEditor,
        document = editor ? editor.document : null;

    if (!document) return;

    const text = document.getText();

    let json;

    try {
        json = JSON.parse(text);
    } catch (e) { }

    if (!json) {
        vscode.window.showErrorMessage('Invalid JSON');

        return;
    }

    const lua = buildLua(json);

    const edit = new vscode.WorkspaceEdit();
    edit.replace(document.uri, new vscode.Range(0, 0, document.lineCount, 0), lua);

    vscode.workspace.applyEdit(edit);
    vscode.languages.setTextDocumentLanguage(document, 'lua');
}

function buildLua(jsonChunk) {
    switch (typeof jsonChunk) {
        case "string":
            return JSON.stringify(jsonChunk);
        case "number":
            return jsonChunk.toString();
        case "boolean":
            return jsonChunk ? "true" : "false";
        case "object":
            if (Array.isArray(jsonChunk)) {
                return buildLuaArray(jsonChunk);
            } else {
                return buildLuaObject(jsonChunk);
            }
    }

    return "nil";
}

function buildLuaArray(jsonArray) {
    return `{${jsonArray.map(buildLua).join(", ")}}`;
}

function buildLuaObject(jsonObject) {
    return `{${Object.keys(jsonObject).map(key => {
        if (key.match(/^[a-zA-Z_][a-zA-Z0-9_]*$/)) {
            return `${key} = ${buildLua(jsonObject[key])}`;
        }

        return `[${buildLua(key)}] = ${buildLua(jsonObject[key])}`;
    }).join(", ")}}`;
}

export function registerJSONCommands(context) {
    vscode.commands.registerCommand('vs-fivem.convertJSON', () => {
        convertJSONToLua();
    }, null, context.subscriptions);
}