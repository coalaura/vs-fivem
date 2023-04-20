const vscode = require('vscode');

const knowledge = require('./knowledge.js');

function refreshDiagnostics(doc, nativeDiagnostics) {
	const check = text => {
		const results = [];

		for (const check of knowledge) {
			const matches = text.matchAll(check.regex);

			for (const match of matches) {
				results.push({
					message: check.message.replace('$0', match[0]),
					start: match.index,
					end: match.index + match[0].length,

					id: check.id,
					type: check.type
				});
			}
		}

		return results;
	};

	const diagnostics = [];

	for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
		const lineOfText = doc.lineAt(lineIndex).text;

		const results = check(lineOfText);

		if (results) {
			results.forEach(r => {
				const range = new vscode.Range(lineIndex, r.start, lineIndex, r.end);

				const severity = r.type === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information;

				const diagnostic = new vscode.Diagnostic(range, r.message, severity);

				diagnostic.code = r.id;

				diagnostics.push(diagnostic);
			});
		}
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

module.exports = {
	subscribeToDocumentChanges,
	registerQuickFixHelper,
	addNativeAliases
}
