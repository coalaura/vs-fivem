import vscode from 'vscode';
import fetch from 'node-fetch';

import { createNativeObject, formatParameters, formatReturns, getPositionContext } from './natives.js';
import { subscribeToDocumentChanges, registerQuickFixHelper, addNativeAliases, lintFolder, refreshDiagnosticsNow, fixAllDiagnostics, ignoreNativeDiagnostics } from './diagnostics.js';
import { updateStatisticsStatus } from './statistics.js';
import { setSearchableNatives, searchNatives } from './search.js';
import { setNatives, registerWebViewProvider } from './view.js';
import { registerContextInserts, setContextNatives } from './resource.js';
import { registerDefinitionProvider, buildIndex } from './index.js';
import { registerHoverProvider } from './hover.js';
import { registerColorProvider } from './colors.js';

let natives = [],
	aliases = {},
	hashes = {};

async function getJSON(url) {
	const controller = new AbortController(),
		timeout = setTimeout(() => controller.abort(), 3000);

	const response = await fetch(url, {
		signal: controller.signal
	});

	clearTimeout(timeout);

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
export function activate(context) {
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

	const nativeDiagnostics = vscode.languages.createDiagnosticCollection('natives');

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
		refreshDiagnosticsNow(document, nativeDiagnostics);

		progress.report({ increment: 100 });
	});

	buildIndex();

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


	const lintFolderCommandDisposable = vscode.commands.registerCommand('vs-fivem.lintFolder', folder => {
		lintFolder(folder, nativeDiagnostics);
	});

	const fixAllCommandDisposable = vscode.commands.registerCommand('vs-fivem.fixAll', () => {
		fixAllDiagnostics(nativeDiagnostics);
	});

	const ignoreNativeCommandDisposable = vscode.commands.registerCommand('vs-fivem.ignoreNative', () => {
		ignoreNativeDiagnostics(nativeDiagnostics);
	});

	registerDefinitionProvider(context);
	registerContextInserts(context);
	registerWebViewProvider(context);
	registerQuickFixHelper(context);
	registerHoverProvider(context);
	registerColorProvider(context);

	context.subscriptions.push(completionDisposable);
	context.subscriptions.push(changeEditorDisposable);
	context.subscriptions.push(changeTextDisposable);
	context.subscriptions.push(nativeDiagnostics);
	context.subscriptions.push(lintFolderCommandDisposable);
	context.subscriptions.push(fixAllCommandDisposable);
	context.subscriptions.push(ignoreNativeCommandDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() { }
