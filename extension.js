const vscode = require('vscode'),
	fetch = require('node-fetch');

const { createNativeObject, createNativeDocumentation, formatParameters, formatReturns, getPositionContext } = require('./natives.js');
const { subscribeToDocumentChanges, registerQuickFixHelper, addNativeAliases, lintFolder, refreshDiagnostics, fixAllDiagnostics, ignoreNativeDiagnostics } = require('./diagnostics.js');
const { updateStatisticsStatus } = require('./statistics.js');
const { setSearchableNatives, searchNatives, findNative } = require('./search.js');
const { setNatives, registerWebViewProvider } = require('./view.js');
const { registerContextInserts, setContextNatives } = require('./resource.js');
const { formatDocument } = require('./formatter.js');

let natives = [],
	aliases = {},
	hashes = {};

async function getJSON(url) {
	const response = await fetch(url);

	return response.json();
}

async function fetchNatives(url, result) {
	const json = await getJSON(url);

	if (!json) {
		return false;
	}

	for (const category in json) {
		const children = json[category];

		for (const child in children) {
			const data = children[child];

			const native = createNativeObject(data);

			result.natives.push(native);

			if (native.aliases) {
				native.aliases.forEach(alias => {
					result.aliases[alias] = native.name;
				});
			}

			if (native.name !== native.hash) {
				result.hashes['N_' + native.hash] = native.name;
			}
		}
	}

	return true;
}

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	if (natives.length > 0) return;

	const cache = context.globalState.get('natives');

	if (cache && cache.natives && cache.aliases && cache.hashes) {
		natives = cache.natives;
		aliases = cache.aliases;
		hashes = cache.hashes;

		addNativeAliases(aliases, hashes);
		setSearchableNatives(natives);
		setNatives(natives);
		setContextNatives(natives);
	}

	const nativeDiagnostics = vscode.languages.createDiagnosticCollection("natives");

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Window,
		cancellable: false,
		title: 'Fetching Natives'
	}, async (progress) => {
		progress.report({ increment: 10 });

		const result = {
			natives: [],
			aliases: {},
			hashes: {}
		};

		const ok1 = await fetchNatives('https://runtime.fivem.net/doc/natives_cfx.json', result);
		const ok2 = await fetchNatives('https://runtime.fivem.net/doc/natives.json', result);

		if (ok1 && ok2) {
			natives = result.natives;
			aliases = result.aliases;
			hashes = result.hashes;

			context.globalState.update('natives', result);
		} else {
			vscode.window.showWarningMessage('Failed to update natives list.');

			return;
		}

		addNativeAliases(aliases, hashes);
		setSearchableNatives(natives);
		setNatives(natives);

		const nativeStatusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left, 1);

		const amount = new Intl.NumberFormat('en-US').format(natives.length);

		nativeStatusBar.text = `$(open-editors-view-icon) ${amount}`;
		nativeStatusBar.tooltip = `Loaded ${amount} natives`;

		nativeStatusBar.show();

		const document = vscode.window.activeTextEditor ? vscode.window.activeTextEditor.document : false;

		updateStatisticsStatus(document, natives);
		refreshDiagnostics(document, nativeDiagnostics);

		progress.report({ increment: 100 });
	});

	// completion provider
	const completionDisposable = vscode.languages.registerCompletionItemProvider('lua', {
		provideCompletionItems(document, position) {
			const ctx = getPositionContext(document, position);

			const results = searchNatives(ctx.name);

			const items = results.map(native => {
				const item = new vscode.CompletionItem(native.name, vscode.CompletionItemKind.Function);

				item.detail = native.detail;
				item.documentation = native.description;

				item.sortText = (native.apiset === ctx.ctx ? '' : '~') + native.name;

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

			const native = findNative(ctx.name, ctx.ctx);

			if (!native) return;

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

	subscribeToDocumentChanges(context, nativeDiagnostics);

	registerQuickFixHelper(context);

	const lintFolderCommandDisposable = vscode.commands.registerCommand('vs-fivem.lintFolder', folder => {
		lintFolder(folder, nativeDiagnostics);
	});

	const fixAllCommandDisposable = vscode.commands.registerCommand('vs-fivem.fixAll', () => {
		fixAllDiagnostics(nativeDiagnostics);
	});

	const ignoreNativeCommandDisposable = vscode.commands.registerCommand('vs-fivem.ignoreNative', () => {
		ignoreNativeDiagnostics(nativeDiagnostics);
	});

	const formattingDisposable = vscode.languages.registerDocumentFormattingEditProvider('lua', {
		provideDocumentFormattingEdits(document) {
			return formatDocument(document);
		}
	});

	registerContextInserts(context);

	registerWebViewProvider(context);

	context.subscriptions.push(completionDisposable);
	context.subscriptions.push(hoverDisposable);
	context.subscriptions.push(changeEditorDisposable);
	context.subscriptions.push(changeTextDisposable);
	context.subscriptions.push(nativeDiagnostics);
	context.subscriptions.push(lintFolderCommandDisposable);
	context.subscriptions.push(fixAllCommandDisposable);
	context.subscriptions.push(ignoreNativeCommandDisposable);
	context.subscriptions.push(formattingDisposable);
}

// This method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
