const vscode = require('vscode');

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

	const count = nativeNames.filter((name, index) => {
		return nativeNames.indexOf(name) === index;
	}).map(native => {
		const rgx = new RegExp(`\\b${native}\\s*\\(`, 'g');

		return (text.match(rgx) || []).length;
	}).reduce((a, b) => a + b, 0);

	const amount = new Intl.NumberFormat('en-US').format(count);

	statusItem.text = `$(callhierarchy-outgoing) ${amount}`;
	statusItem.tooltip = `${amount} native calls`;

	statusItem.show();
}

module.exports = {
	updateStatisticsStatus
};
