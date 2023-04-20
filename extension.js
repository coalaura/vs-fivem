const vscode = require('vscode'),
	fetch = require('node-fetch');

const { createNativeObject, createNativeDocumentation, formatParameters, formatReturns, getPositionContext } = require('./natives.js');
const { subscribeToDocumentChanges, registerQuickFixHelper, addNativeAliases } = require('./diagnostics.js');
const { updateStatisticsStatus } = require('./statistics.js');

const natives = [],
	aliases = {};

async function getJSON(url) {
	const response = await fetch(url);

	return response.json();
}

async function fetchNatives(url) {
	const json = await getJSON(url);

	if (!json) {
		console.log('Failed to fetch natives from ' + url);

		return;
	}

	for (const category in json) {
		const children = json[category];

		for (const child in children) {
			const data = children[child];

			const native = createNativeObject(data);

			natives.push(native);

			if (native.aliases) {
				native.aliases.forEach(alias => {
					aliases[alias] = native.name;
				});
			}
		}
	}
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	if (natives.length > 0) return;

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Window,
		cancellable: false,
		title: 'Fetching Natives'
	}, async (progress) => {
		progress.report({ increment: 10 });

		await fetchNatives('https://runtime.fivem.net/doc/natives_cfx.json');
		await fetchNatives('https://runtime.fivem.net/doc/natives.json');

		console.log('Fetched ' + natives.length + ' natives.');

		addNativeAliases(aliases);

		const nativeStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);

		const amount = new Intl.NumberFormat('en-US').format(natives.length);

		nativeStatusBar.text = `$(open-editors-view-icon) ${amount}`;
		nativeStatusBar.tooltip = `Loaded ${amount} natives`;

		nativeStatusBar.show();

		const document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : false;

		updateStatisticsStatus(document, natives);

		progress.report({ increment: 100 });
	});

	// completion provider
	const completionDisposable = vscode.languages.registerCompletionItemProvider('lua', {
		provideCompletionItems(document, position) {
			const ctx = getPositionContext(document, position);

			const items = natives.filter(native => {
				return native.name.startsWith(ctx.name);
			}).map(native => {
				const item = new vscode.CompletionItem(native.name, vscode.CompletionItemKind.Function);

				item.detail = native.detail;
				item.documentation = native.description;

				item.sortText = (native.apiset === ctx.ctx ? '~' : '') + native.name;

				let insertText = native.name + '(' + formatParameters(native.params, true) + ')';

				if (!ctx.inline) {
					insertText = formatReturns(native.returns, true) + insertText;
				}

				item.insertText = new vscode.SnippetString(insertText);

				return item;
			});

			return items;
		}
	});

	// hover provider
	const hoverDisposable = vscode.languages.registerHoverProvider('lua', {
		provideHover(document, position) {
			const ctx = getPositionContext(document, position);

			if (!ctx.name) return;

			let native = natives.find(native => {
				return native.name === ctx.name && native.apiset === ctx.ctx;
			});

			if (!native) {
				native = natives.find(native => {
					return native.name === ctx.name;
				});

				if (!native) return;
			}

			return new vscode.Hover(createNativeDocumentation(native));
		}
	});

	let changeTextTimeout = null;

	const changeEditorDisposable = vscode.window.onDidChangeActiveTextEditor(editor => {
		clearTimeout(changeTextTimeout);

		const document = editor ? editor.document : false;

		updateStatisticsStatus(document, natives);
	});

	const changeTextDisposable = vscode.workspace.onDidChangeTextDocument(event => {
		clearTimeout(changeTextTimeout);

		const document = event.document;

		changeTextTimeout = setTimeout(() => {
			updateStatisticsStatus(document, natives);
		}, 500);
	});

	const nativeDiagnostics = vscode.languages.createDiagnosticCollection("natives");
	context.subscriptions.push(nativeDiagnostics);

	subscribeToDocumentChanges(context, nativeDiagnostics);

	registerQuickFixHelper(context);

	context.subscriptions.push(completionDisposable);
	context.subscriptions.push(hoverDisposable);
	context.subscriptions.push(changeEditorDisposable);
	context.subscriptions.push(changeTextDisposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
