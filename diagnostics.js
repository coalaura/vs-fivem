const path = require('path');
const vscode = require('vscode');
const luaparse = require('luaparse');

const { findAllFunctions } = require('./search.js');

let knowledge = require('./knowledge.js');

function refreshDiagnostics(doc, nativeDiagnostics) {
	if (!doc) {
		return;
	}

	const started = Date.now();

	const text = doc.getText();

	const functions = findAllFunctions(text);

	const diagnostics = [];

	knowledge.forEach(check => {
		const name = check.func,
			args = check.args;

		const found = functions.filter(func => {
			return func.name === name && (!args || func.params.match(args));
		});

		found.forEach(func => {
			const position = doc.positionAt(func.index);

			const start = position.character,
				end = start + (args ? func.match : func.name).length;

			const range = new vscode.Range(position.line, start, position.line, end);

			const severity = check.type === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information;

			const diagnostic = new vscode.Diagnostic(range, check.message, severity);

			diagnostic.code = check.id;

			diagnostics.push(diagnostic);
		});
	});

	// Trailing whitespace
	let matches = text.matchAll(/[ \t]+$/gm);

	Array.from(matches).forEach(match => {
		const position = doc.positionAt(match.index);

		const range = new vscode.Range(position.line, position.character, position.line, position.character + match[0].length);

		const diagnostic = new vscode.Diagnostic(range, 'Trailing whitespace', vscode.DiagnosticSeverity.Warning);

		diagnostic.code = 'whitespace';

		diagnostics.push(diagnostic);
	});

	// 3 or more newlines
	matches = text.matchAll(/(\r?\n){3,}/gm);

	Array.from(matches).forEach(match => {
		const start = doc.positionAt(match.index),
			end = doc.positionAt(match.index + match[0].length);

		const range = new vscode.Range(start.line, start.character, end.line, end.character);

		const diagnostic = new vscode.Diagnostic(range, 'Avoid excessive newlines', vscode.DiagnosticSeverity.Information);

		diagnostic.code = 'newlines';

		diagnostics.push(diagnostic);
	});

	if (text !== '' && !text.endsWith('\n')) {
		const position = doc.positionAt(text.length);

		const range = new vscode.Range(position.line, position.character, position.line, position.character);

		const diagnostic = new vscode.Diagnostic(range, 'File should end with a newline', vscode.DiagnosticSeverity.Information);

		diagnostic.code = 'trail_newline';

		diagnostics.push(diagnostic);
	}

	try {
		luaparse.parse(text, {
			comments: false,
			luaVersion: '5.3'
		});
	} catch (e) {
		if ('index' in e) {
			const position = doc.positionAt(e.index);

			const line = doc.lineAt(position.line).text;

			const range = new vscode.Range(position.line, position.character, position.line, line.length);

			const message = e.message.replace(/^\[\d+:\d+\] /, '');

			const diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error);

			diagnostic.code = 'syntax';

			diagnostics.push(diagnostic);
		}
	}

	const elapsed = Date.now() - started;

	if (elapsed > 100) {
		console.warn(`Diagnostics for ${doc.fileName} took ${elapsed}ms (>100ms)`);
	}

	nativeDiagnostics.delete(doc.uri);

	nativeDiagnostics.set(doc.uri, diagnostics);
}

function subscribeToDocumentChanges(context, nativeDiagnostics) {
	const activeEditor = vscode.window.activeTextEditor;

	if (activeEditor && activeEditor.document.languageId === 'lua') {
		refreshDiagnostics(activeEditor.document, nativeDiagnostics);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor && activeEditor.document.languageId === 'lua') {
				refreshDiagnostics(editor.document, nativeDiagnostics);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => {
			if (e.document.languageId === 'lua') {
				refreshDiagnostics(e.document, nativeDiagnostics)
			}
		})
	);
}

function getQuickFixFromDiagnostic(document, diagnostic, returnEditOnly) {
	const id = diagnostic.code;

	let message = "",
		replace = "";

	if (id === 'whitespace') {
		message = 'Remove trailing whitespace';
		replace = '';
	} else if (id === 'newlines') {
		message = 'Reduce newlines';
		replace = '\n\n';
	} else if (id === 'trail_newline') {
		message = 'Add trailing newline';
		replace = '\n';
	} else {
		const entry = knowledge.find(e => e.id === id);

		if (entry && entry.replace) {
			message = `Replace with ${entry.replace}`;
			replace = entry.replace;
		}
	}

	if (message) {
		const edit = new vscode.WorkspaceEdit();

		edit.replace(document.uri, diagnostic.range, replace);

		if (returnEditOnly) {
			return edit;
		}

		const action = new vscode.CodeAction(message, vscode.CodeActionKind.QuickFix);

		action.edit = edit;

		return action;
	}

	return false;
}

function registerQuickFixHelper(context) {
	context.subscriptions.push(
		vscode.languages.registerCodeActionsProvider('lua', {
			provideCodeActions(document, range, context) {
				const diagnostics = context.diagnostics;

				if (diagnostics.length === 0) {
					return;
				}

				const actions = [];

				for (const diagnostic of diagnostics) {
					const action = getQuickFixFromDiagnostic(document, diagnostic, false);

					if (action) {
						actions.push(action);
					}
				}

				return actions;
			}
		})
	);
}

function addNativeAliases(aliases, hashes) {
	knowledge = knowledge.filter(e => !e.dynamic);

	let index = 1;

	for (const alias in aliases) {
		const replacement = aliases[alias];

		if (replacement === alias) continue;

		knowledge.push({
			dynamic: true,

			id: `a${index}`,
			type: 'warning',
			func: alias,
			message: `${alias} is deprecated, use ${replacement} instead`,
			replace: replacement
		});

		index++;
	}

	index = 1;

	for (const hash in hashes) {
		const replacement = hashes[hash];

		knowledge.push({
			dynamic: true,

			id: `h${index}`,
			type: 'warning',
			func: hash,
			message: `Use the named native ${replacement} instead of its hash ${hash}`,
			replace: replacement
		});

		index++;
	}
}

function lintFolder(folder, nativeDiagnostics) {
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(folder);

	if (!workspaceFolder) return;

	const workspaceFolderPath = workspaceFolder.uri.path;

	const searchFolder = path.relative(workspaceFolderPath, folder.path).replace(/\[|\]/g, '[$&]');

	const searchPath = (searchFolder ? searchFolder + '/' : '') + '**/*.lua';

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'Linting ' + path.basename(folder.path),
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

		let index = 0;

		for (const file of files) {
			if (canceled) return;

			const percentage = Math.floor((index / files.length) * 100);

			const doc = await vscode.workspace.openTextDocument(file);

			progress.report({
				increment: 100 / files.length,
				message: percentage + '% - ' + path.basename(doc.fileName) + '...'
			});

			refreshDiagnostics(doc, nativeDiagnostics);

			index++;
		}
	});
}

async function fixAllDiagnostics(nativeDiagnostics) {
	const documents = [];

	nativeDiagnostics.forEach((uri, entries) => {
		const docPath = uri.path;

		entries.forEach(() => {
			if (!documents.includes(docPath)) {
				documents.push(docPath);
			}
		});
	});

	if (documents.length > 0) {
		vscode.window.withProgress({
			location: vscode.ProgressLocation.Notification,
			title: 'Fixing diagnostics',
		}, async (progress) => {
			let index = 0;

			for (const docPath of documents) {
				const percentage = Math.floor((index / documents.length) * 100);

				progress.report({
					increment: 100 / documents.length,
					message: percentage + '%'
				});

				const uri = vscode.Uri.file(docPath);

				const document = await vscode.workspace.openTextDocument(uri);

				while (true) {
					refreshDiagnostics(document, nativeDiagnostics);

					const entries = nativeDiagnostics.get(uri);

					const edits = entries.map(e => getQuickFixFromDiagnostic(document, e, true)).filter(e => e);

					if (edits.length === 0) break;

					await vscode.workspace.applyEdit(edits[0]);
				}

				await document.save();

				index++;
			}
		});
	}
}

module.exports = {
	refreshDiagnostics,
	subscribeToDocumentChanges,
	registerQuickFixHelper,
	addNativeAliases,
	lintFolder,
	fixAllDiagnostics
}
