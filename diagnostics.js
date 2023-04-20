const path = require('path');
const vscode = require('vscode');

const knowledge = require('./knowledge.js');

function refreshDiagnostics(doc, nativeDiagnostics) {
	const text = doc.getText();

	const results = [];

	for (const check of knowledge) {
		const matches = text.matchAll(check.regex);

		for (const match of matches) {
			const position = doc.positionAt(match.index);

			const start = position.character,
				end = start + match[0].length;

			results.push({
				message: check.message.replace('$0', match[0]),
				start: start,
				end: end,
				line: position.line,

				id: check.id,
				type: check.type
			});
		}
	}

	const diagnostics = [];

	if (results) {
		results.forEach(r => {
			const range = new vscode.Range(r.line, r.start, r.line, r.end);

			const severity = r.type === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information;

			const diagnostic = new vscode.Diagnostic(range, r.message, severity);

			diagnostic.code = r.id;

			diagnostics.push(diagnostic);
		});
	}

	nativeDiagnostics.set(doc.uri, diagnostics);
}

function subscribeToDocumentChanges(context, nativeDiagnostics) {
	if (vscode.window.activeTextEditor) {
		refreshDiagnostics(vscode.window.activeTextEditor.document, nativeDiagnostics);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				refreshDiagnostics(editor.document, nativeDiagnostics);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, nativeDiagnostics))
	);

	context.subscriptions.push(
		vscode.workspace.onDidCloseTextDocument(doc => nativeDiagnostics.delete(doc.uri))
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
			regex: new RegExp(`(?<=^|[^\\w:])${alias}(?=\\s*\\()`, 'g'),
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
			regex: new RegExp(`(?<=^|[^\\w:])${hash}(?=\\s*\\()`, 'g'),
			message: `Use the named native ${replacement} instead of its hash ${hash}`,
			replace: replacement
		});

		index++;
	}
}

function lintFolder(folder) {
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

		const nativeDiagnostics = vscode.languages.createDiagnosticCollection('lua');

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
	subscribeToDocumentChanges,
	registerQuickFixHelper,
	addNativeAliases,
	lintFolder
}
