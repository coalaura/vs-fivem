import { relative, basename } from 'path';
import vscode from 'vscode';

import { getIndex } from './singletons/native-index.js';
import { on } from './singletons/event-bus.js';
import { matchAll } from './helper/regexp.js';
import { getFileContext } from './helper/natives.js';
import { onAnyDocumentChange } from './helper/listeners.js';
import { parse, visitFunctions } from './parser.js';
import { showSyntaxErrors, excludeFilesRegex } from './helper/config';
import { getDefaultValueForBasicType, luaTypeToBasicType, detectBasicTypeFromValue, convertValueToBasicType } from './helper/types.js';
import logger from './singletons/logger.js';

import DiagnosticIndex from './classes/diagnostic-index.js';
import Diagnostic from './classes/diagnostic.js';
import Knowledge from './data/knowledge.js';

const index = new DiagnosticIndex();

const diagnosticsTimeouts = {};

function resolveSeverity(type) {
	switch (type) {
		case 'error':
			return vscode.DiagnosticSeverity.Error;
		case 'warning':
			return vscode.DiagnosticSeverity.Warning;
		case 'info':
			return vscode.DiagnosticSeverity.Information;
		case 'hint':
			return vscode.DiagnosticSeverity.Hint;
	}

	return vscode.DiagnosticSeverity.Error;
}

export function refreshDiagnosticsNow(doc) {
	if (!doc) return;

	index.clear(doc);

	// Not Lua? Not interested.
	if (doc.languageId !== 'lua') return;

	const excludeRgx = excludeFilesRegex();

	if (excludeRgx && excludeRgx.test(doc.fileName)) return;

	const started = Date.now();

	const text = doc.getText(),
		diagnostics = [];

	const { tree, error } = parse(text);

	if (error) {
		if (showSyntaxErrors()) {
			const { column, line, message } = error;

			const start = new vscode.Position(line - 1, column),
				end = doc.lineAt(line).range.end,
				range = new vscode.Range(start, end);

			diagnostics.push(new Diagnostic(range, message, vscode.DiagnosticSeverity.Error, false));
		}
	} else {
		const context = getFileContext(doc.fileName);

		visitFunctions(tree, (name, args, location) => {
			const index = getIndex();

			const range = () => {
				return new vscode.Range(
					new vscode.Position(location.start.line - 1, location.start.column),
					new vscode.Position(location.end.line - 1, location.end.column)
				);
			};

			// General knowledge
			const check = Knowledge[name] || false;

			if (check && (!check.match || check.match(args))) {
				const severity = resolveSeverity(check.type);

				diagnostics.push(new Diagnostic(range(), check.message, severity, check.replace));

				return;
			}

			// Native aliases & hashes
			const hash = index.getNameFromHash(name);

			if (hash) {
				diagnostics.push(new Diagnostic(range(), `\`${name}\` is named, use \`${hash}\` instead.`, vscode.DiagnosticSeverity.Warning, hash));

				return;
			}

			const alias = index.getNameFromAlias(name);

			if (alias) {
				diagnostics.push(new Diagnostic(range(), `\`${name}\` is deprecated, use \`${alias}\` instead.`, vscode.DiagnosticSeverity.Warning, alias));

				return;
			}

			// Native checks
			const native = index.get(name, context);

			if (native) {
				const expected = native.parameters.length,
					actual = args.length;

				// Wrong number of arguments
				if (expected !== actual) {
					diagnostics.push(new Diagnostic(range(), `${native.name} expects ${expected} arguments instead of ${actual}.`, vscode.DiagnosticSeverity.Warning));

					return;
				}

				// Wrong argument types
				for (let i = 0; i < expected; i++) {
					const param = native.parameters[i],
						basicType = luaTypeToBasicType(param.type);

					const arg = args[i];

					if (arg.type !== 'any' && arg.type !== basicType) {
						diagnostics.push(new Diagnostic(range(), `${native.name} expects ${basicType} instead of ${arg.type}.`, vscode.DiagnosticSeverity.Warning));
					}
				}
			}
		});
	}

	index.set(doc, diagnostics);

	logger.log(`Resolved diagnostics for ${doc.fileName} in ${Date.now() - started}ms.`);

	return diagnostics.length;
}

function refreshDiagnosticsWithTimeout(doc) {
	if (!doc) return;

	const name = doc.fileName;

	clearTimeout(diagnosticsTimeouts[name]);

	diagnosticsTimeouts[name] = setTimeout(() => {
		refreshDiagnosticsNow(doc);
	}, 500);
}

function lintFolder(folder) {
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(folder);

	if (!workspaceFolder) return;

	const workspaceFolderPath = workspaceFolder.uri.path;

	const searchFolder = relative(workspaceFolderPath, folder.path).replace(/\[|\]/g, '[$&]');

	const searchPath = (searchFolder ? searchFolder + '/' : '') + '**/*.lua';

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'Linting ' + basename(folder.path),
		cancellable: true
	}, async (progress, token) => {
		let canceled = false;

		token.onCancellationRequested(() => {
			canceled = true;
		});

		progress.report({
			increment: 0,
			message: 'Collecting lua files...'
		});

		const files = await vscode.workspace.findFiles(searchPath)
		batch = Math.ceil(files.length / 20);

		if (canceled) return;

		let issues = 0;

		for (const [index, file] of files.entries()) {
			if (canceled) return;

			const doc = await vscode.workspace.openTextDocument(file);

			if (index % batch === 0) {
				const percentage = Math.floor((index / files.length) * 100);

				progress.report({
					increment: 100 / files.length,
					message: percentage + '% - ' + basename(doc.fileName) + '...'
				});
			}

			const foundIssues = refreshDiagnosticsNow(doc);

			if (foundIssues) issues += foundIssues;
		}

		if (issues === 0) {
			vscode.window.showInformationMessage('No issues found.');
		} else {
			vscode.window.showInformationMessage(`Found ${issues} issue${issues > 1 ? 's' : ''}.`);
		}
	});
}

function fixAllDiagnostics() {
	const uris = index.keys();

	if (uris.length === 0) return;

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'Fixing diagnostics',
	}, async (progress) => {
		for (const [index, uri] of uris.entries()) {
			const percentage = Math.floor((index / uri.length) * 100);

			progress.report({
				increment: 100 / uri.length,
				message: percentage + '%'
			});

			const document = await vscode.workspace.openTextDocument(uri);

			while (true) {
				refreshDiagnosticsNow(document);

				const edits = index.get(document)
					.map(diagnostic => index.resolveCodeAction(document, diagnostic.range))
					.filter(Boolean)
					.map(action => action.edit);

				if (edits.length === 0) break;

				await vscode.workspace.applyEdit(edits[0]);
			}

			await document.save();
		}
	});
}

export function registerDiagnostics(context) {
	// Diagnostics provider
	onAnyDocumentChange(context, refreshDiagnosticsWithTimeout);

	// Quick fix provider
	vscode.languages.registerCodeActionsProvider(
		{ scheme: 'file', language: 'lua' },
		{
			provideCodeActions(document, range) {
				const action = index.resolveCodeAction(document, range);

				return action ? [action] : [];
			}
		}, null, context.subscriptions);

	// Commands
	vscode.commands.registerCommand('vs-fivem.lintFolder', folder => {
		lintFolder(folder);
	}, null, context.subscriptions);

	vscode.commands.registerCommand('vs-fivem.fixAll', () => {
		fixAllDiagnostics();
	}, null, context.subscriptions);

	vscode.commands.registerCommand('vs-fivem.clearAll', () => {
		index.clearAll();

		vscode.window.showInformationMessage('Cleared all diagnostics.');
	}, null, context.subscriptions);

	// Once natives are loaded
	on('natives', () => {
		const editor = vscode.window.activeTextEditor,
			document = editor ? editor.document : false;

		if (!document) return;

		refreshDiagnosticsNow(document);
	});
}
