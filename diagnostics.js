const path = require('path');
const vscode = require('vscode');
const luaparse = require('./luaparse.js');

const { findAllFunctions, findNative } = require('./search.js');
const { getFileContext } = require('./natives.js');

const ignoredNatives = [];

let knowledge = require('./knowledge.js');

function matchesSimplifiedType(type, expected, raw) {
	expected = expected.toLowerCase();

	if (['hash', 'ped', 'object', 'player', 'entity', 'vehicle', 'blip', 'cam', 'pickup', 'long'].includes(expected)) {
		expected = 'integer';
	} else if (expected.startsWith('any')) {
		return true;
	}

	switch (type) {
		case 'BooleanLiteral':
			return expected === 'boolean';
		case 'NumericLiteral':
			if (expected === 'integer') {
				return !raw.includes('.');
			} else if (expected === 'number') {
				return raw.includes('.');
			}

			return false;
		case 'StringLiteral':
			return expected === 'string';
		case 'NilLiteral':
			return expected === 'nil';
	}

	return true;
}

let diagnosticsTimeouts = {};

function refreshDiagnosticsWithTimeout(doc, nativeDiagnostics) {
	if (!doc) {
		return;
	}

	const name = doc.fileName;

	clearTimeout(diagnosticsTimeouts[name]);

	diagnosticsTimeouts[name] = setTimeout(() => {
		refreshDiagnosticsNow(doc, nativeDiagnostics);
	}, 500);
}

function _replacement(check, replacement) {
	if (!replacement) {
		return check.message;
	}

	return check.message + "\n\nFix: " + replacement;
}

function refreshDiagnosticsNow(doc, nativeDiagnostics) {
	if (!doc) {
		return;
	}

	const uri = doc.uri;

	nativeDiagnostics.delete(uri);

	if (doc.languageId !== 'lua') {
		return;
	}

	const started = Date.now();

	const text = doc.getText();

	const functions = findAllFunctions(text);

	const diagnostics = [];

	const config = vscode.workspace.getConfiguration('vs-fivem'),
		supportLuaGLM = config.get('luaGLM');

	knowledge.filter(check => {
		return supportLuaGLM || !check.lua_glm;
	}).forEach(check => {
		const regex = check.regex,
			name = check.func,
			args = check.args;

		if (regex) {
			const matches = text.matchAll(regex);

			Array.from(matches).forEach(match => {
				const position = doc.positionAt(match.index);

				const start = luaparse.fixColumnOffsetLine(doc.lineAt(position.line), position.character),
					end = start + match[0].length;

				const range = new vscode.Range(position.line, start, position.line, end);

				const severity = check.type === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information;

				const replacement = text.substring(match.index, match.index + match[0].length).replace(regex, check.replace);

				const diagnostic = new vscode.Diagnostic(range, _replacement(check, replacement), severity);

				diagnostic.code = check.id;

				diagnostics.push(diagnostic);
			});
		} else {
			const found = functions.filter(func => {
				return func.name === name && (!args || func.params.match(args));
			});

			found.forEach(func => {
				const position = doc.positionAt(func.index);

				const start = luaparse.fixColumnOffsetLine(doc.lineAt(position.line), position.character),
					offset = (args ? func.match : func.name).length,
					end = start + offset;

				const range = new vscode.Range(position.line, start, position.line, end);

				const severity = check.type === 'warning' ? vscode.DiagnosticSeverity.Warning : vscode.DiagnosticSeverity.Information;

				const replacement = check.replace ? check.replace.replace(/\$0/g, func.params.match(args)) : false;

				const diagnostic = new vscode.Diagnostic(range, _replacement(check, replacement), severity);

				diagnostic.code = check.id;

				diagnostics.push(diagnostic);
			});
		}
	});

	const context = getFileContext(doc.fileName);

	functions.forEach(func => {
		const native = findNative(func.name, context);

		if (!native || ignoredNatives.includes(native.name)) return;

		if (text.includes(`function ${native.name}`)) return;

		const start = doc.positionAt(func.index),
			previousLine = start.line > 1 ? doc.lineAt(start.line - 1).text : false;

		if (previousLine && previousLine.includes('-- IGNORE')) return;

		let index = func.index + func.name.length + 1,
			code = text.substring(func.index, index),
			openingBrackets = 1;

		// Get the whole function call (including arguments and nested calls)
		while (openingBrackets > 0 && index < text.length) {
			const char = text.charAt(index);

			if (char === '(') {
				openingBrackets++;
			} else if (char === ')') {
				openingBrackets--;
			}

			code += char;

			index++;
		}

		if (openingBrackets > 0) return;

		try {
			const ast = luaparse.parse(code, {
				comments: false
			});

			if (ast.body.length === 0 || ast.body[0].type !== 'CallStatement') {
				return;
			}

			const args = ast.body[0].expression.arguments;

			if (args.length !== native.params.length) {
				const end = doc.positionAt(index - 1);

				const startCol = luaparse.fixColumnOffsetLine(doc.lineAt(start.line), start.character),
					endCol = luaparse.fixColumnOffsetLine(doc.lineAt(end.line), end.character);

				const range = new vscode.Range(start.line, startCol, end.line, endCol);

				const diagnostic = new vscode.Diagnostic(range, `${native.name} expects ${native.params.length} parameters instead of ${args.length}.`, vscode.DiagnosticSeverity.Warning);

				diagnostic.code = 'param-count';

				diagnostics.push(diagnostic);
			} else {
				for (let x = 0; x < args.length; x++) {
					let arg = args[x],
						param = native.params[x];

					if (arg.type === 'UnaryExpression') {
						const operator = arg.operator;

						arg = arg.argument;

						arg.raw = operator + arg.raw;
					}

					if (!matchesSimplifiedType(arg.type, param.type, arg.raw)) {
						const start = doc.positionAt(func.index + arg.range[0]),
							end = doc.positionAt(func.index + arg.range[1]);

						const startCol = luaparse.fixColumnOffsetLine(doc.lineAt(start.line), start.character),
							endCol = luaparse.fixColumnOffsetLine(doc.lineAt(end.line), end.character);

						const range = new vscode.Range(start.line, startCol, end.line, endCol);

						const diagnostic = new vscode.Diagnostic(range, `${native.name} expects ${param.type} for parameter ${x + 1}.`, vscode.DiagnosticSeverity.Warning);

						diagnostic.code = 'param-type';

						diagnostics.push(diagnostic);
					}
				}
			}
		} catch (e) { }
	});

	// Trailing whitespace
	let matches = text.matchAll(/[ \t]+$/gm);

	Array.from(matches).forEach(match => {
		const position = doc.positionAt(match.index);

		const startCol = luaparse.fixColumnOffsetLine(doc.lineAt(position.line), position.character),
			endCol = luaparse.fixColumnOffsetLine(doc.lineAt(position.line), position.character + match[0].length);

		const range = new vscode.Range(position.line, startCol, position.line, endCol);

		const diagnostic = new vscode.Diagnostic(range, 'Trailing whitespace', vscode.DiagnosticSeverity.Warning);

		diagnostic.code = 'whitespace';

		diagnostics.push(diagnostic);
	});

	// 3 or more newlines
	matches = text.matchAll(/(\r?\n){3,}/gm);

	Array.from(matches).forEach(match => {
		const start = doc.positionAt(match.index),
			end = doc.positionAt(match.index + match[0].length);

		const startCol = luaparse.fixColumnOffsetLine(doc.lineAt(start.line), start.character),
			endCol = luaparse.fixColumnOffsetLine(doc.lineAt(end.line), end.character);

		const range = new vscode.Range(start.line, startCol, end.line, endCol);

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
			comments: false
		});
	} catch (e) {
		if ('index' in e) {
			const lineNum = e.line - 1;

			const line = doc.lineAt(lineNum).text;

			const startCol = luaparse.fixColumnOffsetLineReverse(doc.lineAt(lineNum), e.column),
				endCol = luaparse.fixColumnOffsetLineReverse(doc.lineAt(lineNum), line.length);

			const range = new vscode.Range(lineNum, startCol, lineNum, endCol);

			const message = e.message.replace(/^\[\d+:\d+\] /, '');

			const diagnostic = new vscode.Diagnostic(range, message, vscode.DiagnosticSeverity.Error);

			diagnostic.code = 'syntax';

			diagnostics.push(diagnostic);
		}
	}

	const elapsed = Date.now() - started;

	if (elapsed > 150) {
		console.warn(`Diagnostics for ${doc.fileName} took ${elapsed}ms (>150ms)`);
	}

	nativeDiagnostics.set(uri, diagnostics);

	return diagnostics.length;
}

function subscribeToDocumentChanges(context, nativeDiagnostics) {
	const activeEditor = vscode.window.activeTextEditor;

	if (activeEditor && activeEditor.document.languageId === 'lua') {
		refreshDiagnosticsWithTimeout(activeEditor.document, nativeDiagnostics);
	}

	context.subscriptions.push(
		vscode.window.onDidChangeActiveTextEditor(editor => {
			if (editor) {
				refreshDiagnosticsWithTimeout(editor.document, nativeDiagnostics);
			}
		})
	);

	context.subscriptions.push(
		vscode.workspace.onDidChangeTextDocument(e => {
			refreshDiagnosticsWithTimeout(e.document, nativeDiagnostics);
		})
	);
}

function getQuickFixFromDiagnostic(document, diagnostic, returnEditOnly) {
	const id = diagnostic.code,
		dMessage = diagnostic.message;

	let message = '',
		replace = '';

	if (id === 'whitespace') {
		message = 'Remove trailing whitespace';
		replace = '';
	} else if (id === 'newlines') {
		message = 'Reduce newlines';
		replace = '\n\n';
	} else if (id === 'trail_newline') {
		message = 'Add trailing newline';
		replace = '\n';
	} else if (dMessage.includes("\n\nFix: ")) {
		const replacement = dMessage.split("\n\nFix: ").pop();

		message = `Replace with ${replacement}`;
		replace = replacement;
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

		let index = 0,
			issueCount = 0;

		for (const file of files) {
			if (canceled) return;

			const percentage = Math.floor((index / files.length) * 100);

			const doc = await vscode.workspace.openTextDocument(file);

			progress.report({
				increment: 100 / files.length,
				message: percentage + '% - ' + path.basename(doc.fileName) + '...'
			});

			issueCount += refreshDiagnosticsNow(doc, nativeDiagnostics);

			index++;
		}

		if (issueCount === 0) {
			vscode.window.showInformationMessage('No issues found.');
		} else {
			vscode.window.showInformationMessage(`Found ${issueCount} issue${issueCount === 1 ? '' : 's'}.`);
		}
	});
}

async function ignoreNativeDiagnostics(nativeDiagnostics) {
	const editor = vscode.window.activeTextEditor,
		document = editor ? editor.document : null;

	if (!document) return;

	const selection = editor.selection;

	const text = document.getText(selection);

	if (!text.trim()) return;

	const context = getFileContext(document.fileName);

	const native = findNative(text, context);

	if (!native) {
		vscode.window.showErrorMessage(`Could not find native ${text}.`);

		return;
	}

	if (ignoredNatives.includes(native.name)) {
		ignoredNatives.splice(ignoredNatives.indexOf(native.name), 1);

		vscode.window.showInformationMessage(`Unignored native ${native.name}.`);
	} else {
		ignoredNatives.push(native.name);

		vscode.window.showInformationMessage(`Ignored native ${native.name} (for this session).`);
	}

	refreshDiagnosticsWithTimeout(document, nativeDiagnostics);
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
					refreshDiagnosticsNow(document, nativeDiagnostics);

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
	refreshDiagnosticsNow,
	subscribeToDocumentChanges,
	registerQuickFixHelper,
	addNativeAliases,
	lintFolder,
	fixAllDiagnostics,
	ignoreNativeDiagnostics
}
