const path = require('path');
const vscode = require('vscode');

const { findAllFunctions } = require('./search.js');

const knowledge = require('./knowledge.js');

function refreshDiagnostics(doc, nativeDiagnostics) {
	if (!doc) {
		return;
	}

	const text = doc.getText();

	const functions = findAllFunctions(text);

	const diagnostics = [];

	knowledge.forEach(check => {
		const name = check.func,
			args = check.args;

		const found = functions.filter(func => {
			return func.name === name && (!args || args.includes(func.params));
		});

		found.forEach(func => {
			const position = doc.positionAt(func.index);

			const start = position.character,
				end = start + func.name.length;

			const range = new vscode.Range(position.line, start, position.line, end);

			const severity = check.type === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information;

			const diagnostic = new vscode.Diagnostic(range, check.message, severity);

			diagnostic.code = check.id;

			diagnostics.push(diagnostic);
		});
	});

	nativeDiagnostics.set(doc.uri, diagnostics);
}

function subscribeToDocumentChanges(context, nativeDiagnostics) {
	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, nativeDiagnostics);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			nativeDiagnostics.clear();

			if (editor) {
				refreshDiagnostics(editor.document, nativeDiagnostics);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => {
			nativeDiagnostics.clear();

			refreshDiagnostics(e.document, nativeDiagnostics)
		})
	);
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
					const id = diagnostic.code;

					const entry = knowledge.find(e => e.id === id);

					if (entry && entry.replace) {
						const action = new vscode.CodeAction(`Replace with ${entry.replace}`, vscode.CodeActionKind.QuickFix);

						action.edit = new vscode.WorkspaceEdit();

						action.edit.replace(document.uri, range, entry.replace);

						actions.push(action);
					}
				}

				return actions;
			}
		})
	);
}

function addNativeAliases(aliases, hashes) {
	let index = 1;

	for (const alias in aliases) {
		const replacement = aliases[alias];

		if (replacement === alias) continue;

		knowledge.push({
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

	const searchPath = path.relative(workspaceFolderPath, folder.path) + '/**/*.lua';

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

		nativeDiagnostics.clear();

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

module.exports = {
	refreshDiagnostics,
	subscribeToDocumentChanges,
	registerQuickFixHelper,
	addNativeAliases,
	lintFolder
}
