import { relative, basename } from 'path';
import vscode from 'vscode';

import nativeIndex from './singletons/native-index.js';
import { on } from './singletons/event-bus.js';
import { matchAll, extractAllFunctionCalls } from './helper/regexp.js';
import { getFileContext } from './helper/natives.js';
import { onAnyDocumentChange } from './helper/listeners.js';
import { parse } from './helper/luaparse.js';
import { isLuaGLM } from './helper/config';
import { getDefaultValueForBasicType, luaTypeToBasicType, detectBasicTypeFromValue, convertValueToBasicType } from './helper/types.js';

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

	const diagnostics = [];

	const text = doc.getText(),
		calls = extractAllFunctionCalls(text);

	// General knowledge
	for (const check of Knowledge) {
		if (check.lua_glm && !isLuaGLM()) continue;

		const regex = check.regex;

		// Regex search
		if (regex) {
			const matches = matchAll(regex, text);

			for (const match of matches) {
				const start = doc.positionAt(match.index),
					end = doc.positionAt(match.index + match[0].length),
					range = new vscode.Range(start, end);

				const replacement = text.substring(match.index, match.index + match[0].length).replace(regex, check.replace),
					severity = resolveSeverity(check.type);

				diagnostics.push(new Diagnostic(range, check.message, severity, replacement));
			}

			continue;
		}

		// Function search
		const name = check.func,
			argumentRegex = check.argumentRegex;

		const matchingCalls = calls.filter(call => {
			return call.name === name && (!argumentRegex || call.rawArguments.match(argumentRegex));
		});

		for (const call of matchingCalls) {
			const replacement = check.replace ? check.replace.replace(/\$0/g, call.rawArguments) : false,
				severity = resolveSeverity(check.type);

			diagnostics.push(new Diagnostic(call.range(doc), check.message, severity, replacement));
		}
	}

	// Native aliases & hashes
	for (const call of calls) {
		const hash = nativeIndex.getNameFromHash(call.name);

		if (hash) {
			const replacement = hash + '(' + call.rawArguments + ')';

			diagnostics.push(new Diagnostic(call.range(doc), `\`${call.name}\` is named, use \`${hash}\` instead.`, vscode.DiagnosticSeverity.Warning, replacement));

			continue;
		}

		const alias = nativeIndex.getNameFromAlias(call.name);

		if (alias) {
			const replacement = alias + '(' + call.rawArguments + ')';

			diagnostics.push(new Diagnostic(call.range(doc), `\`${call.name}\` is deprecated, use \`${alias}\` instead.`, vscode.DiagnosticSeverity.Warning, replacement));
		}
	}

	// Native checks
	const context = getFileContext(doc.fileName);

	for (const call of calls) {
		const native = nativeIndex.get(call.name, context);

		if (!native) {
			continue;
		}

		const callArguments = call.arguments,
			argLength = callArguments.length,
			paramLength = native.parameters.length;

		// Wrong number of arguments
		if (argLength !== paramLength) {
			// If we have less arguments than parameters, we can add the default values
			if (argLength < paramLength) {
				while (callArguments.length < paramLength) {
					const param = native.parameters[callArguments.length],
						basicType = luaTypeToBasicType(param.type);

					callArguments.push({
						value: getDefaultValueForBasicType(basicType)
					});
				}
			}

			const replacement = `${call.name}(${callArguments.slice(0, paramLength).map(argument => argument.value).join(', ')})`;

			diagnostics.push(new Diagnostic(call.range(doc), `${native.name} expects ${paramLength} arguments instead of ${argLength}.`, vscode.DiagnosticSeverity.Warning, replacement));

			continue;
		}

		// Wrong argument types
		for (const [index, argument] of callArguments.entries()) {
			const param = native.parameters[index],
				paramType = luaTypeToBasicType(param.type),
				argType = detectBasicTypeFromValue(argument.value);

			if (paramType !== 'any' && argType !== 'any' && paramType !== argType) {
				const replacement = convertValueToBasicType(paramType, argument.value);

				diagnostics.push(new Diagnostic(argument.range(doc), `${native.name} expects ${param.type} for parameter ${index + 1}.`, vscode.DiagnosticSeverity.Warning, replacement));
			}
		}
	}

	// Trailing whitespace
	{
		const matches = matchAll(/[ \t]+$/gm);

		for (const match of matches) {
			const start = doc.positionAt(match.index),
				end = doc.positionAt(match.index + match[0].length);

			const range = new vscode.Range(start, end);

			diagnostics.push(new Diagnostic(range, 'Trailing whitespace', vscode.DiagnosticSeverity.Warning, ''));
		}
	}

	// 3 or more newlines
	{
		const matches = matchAll(/(\r?\n){3,}/gm);

		for (const match of matches) {
			const start = doc.positionAt(match.index),
				end = doc.positionAt(match.index + match[0].length);

			const range = new vscode.Range(start, end);

			diagnostics.push(new Diagnostic(range, 'Avoid excessive newlines', vscode.DiagnosticSeverity.Information, '\n\n'));
		}
	}

	// No trailing newline
	if (text !== '' && !text.endsWith('\n')) {
		const position = doc.positionAt(text.length);

		const range = new vscode.Range(position, position);

		diagnostics.push(new Diagnostic(range, 'File should end with a newline', vscode.DiagnosticSeverity.Information, '\n'));
	}

	// Syntax errors
	try {
		parse(text);
	} catch (e) {
		if ('index' in e) {
			const start = doc.positionAt(e.index),
				end = doc.lineAt(start.line).range.end;

			const range = new vscode.Range(start, end);

			const message = e.message.replace(/^\[\d+:\d+]/, '');

			diagnostics.push(new Diagnostic(range, message, vscode.DiagnosticSeverity.Error, false));
		}
	}

	index.set(doc, diagnostics);

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

		const files = await vscode.workspace.findFiles(searchPath);

		if (canceled) return;

		let issues = 0;

		for (const [index, file] of files.entries()) {
			if (canceled) return;

			const percentage = Math.floor((index / files.length) * 100);

			const doc = await vscode.workspace.openTextDocument(file);

			progress.report({
				increment: 100 / files.length,
				message: percentage + '% - ' + basename(doc.fileName) + '...'
			});

			issues += refreshDiagnosticsNow(doc);
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
	vscode.languages.registerCodeActionsProvider('lua', {
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

	// Once natives are loaded
	on('natives', () => {
		const editor = vscode.window.activeTextEditor,
			document = editor ? editor.document : false;

		if (!document) return;

		refreshDiagnosticsNow(document);
	});
}
