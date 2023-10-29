const vscode = require('vscode');

const { findAllFunctions } = require('./search.js');

let statusItem = null;

function updateStatisticsStatus(document, natives) {
	if (!document || document.languageId !== 'lua') {
		if (statusItem) {
			statusItem.hide();
		}

		return;
	}

	if (!statusItem) {
		statusItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1);
	}

	const nativeNames = natives.map(native => native.name);

	const text = document.getText();

	const functions = findAllFunctions(text);

	const count = functions.filter(func => nativeNames.includes(func.name)).length;

	const amount = new Intl.NumberFormat('en-US').format(count);

	statusItem.text = `$(callhierarchy-outgoing) ${amount}`;
	statusItem.tooltip = `${amount} native calls`;

	statusItem.show();
}

module.exports = {
	updateStatisticsStatus
};
