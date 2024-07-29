import vscode from 'vscode';

function reverseJOAAT() {
    const editor = vscode.window.activeTextEditor,
        document = editor ? editor.document : null,
        selection = editor.selection;

    if (!document) return;

    const hash = document.getText(selection)?.trim();

    if (!hash || !hash.match(/^(0x[a-f0-9]+|-?\d+)$/m)) {
        vscode.window.showErrorMessage('Invalid or no hash selected.');

        return;
    }

    vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: `Reversing Joaat ${hash}`,
		cancellable: true
	}, async progress => {
        try {
            const json = await fetch(`https://joaat.sh/api/unjoaat/${hash}`).then(response => response.json());

            if (!json || !json.string) {
                throw new Error();
            }

            const edit = new vscode.WorkspaceEdit();

            edit.replace(document.uri, selection, `GetHashKey("${json.string}")`);

            await vscode.workspace.applyEdit(edit);
        } catch(e) {
            vscode.window.showErrorMessage('Unable to reverse hash.');
        }

        progress.report({ increment: 100 });
    });
}

export function registerJOAATCommands(context) {
    vscode.commands.registerCommand('vs-fivem.reverseJoaat', () => {
        reverseJOAAT();
    }, null, context.subscriptions);
}