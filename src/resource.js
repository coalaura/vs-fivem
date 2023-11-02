import vscode from 'vscode';
import { relative, basename } from 'path';

import { parseList, formatList } from './helper.js';
import { findAllFunctions } from './search.js';

let nativeList = [];

async function createNewResource(folder) {
	folder = vscode.workspace.getWorkspaceFolder(folder);

	if (!folder) return;

	const name = await vscode.window.showInputBox({
		title: 'Resource Name',
		placeHolder: 'my-resource',
		validateInput: text => {
			if (!text || !text.trim() || !text.match(/^[a-z0-9\-_]+$/i)) {
				return 'Please enter a valid resource name.';
			}

			return null;
		}
	});

	if (!name) return;

	const path = folder.uri.fsPath + '/' + name;

	await vscode.workspace.fs.createDirectory(vscode.Uri.file(path));

	const files = {
		'fxmanifest.lua': `fx_version "cerulean"

game "gta5"

server_scripts {
	"server.lua"
}

client_scripts {
	"client.lua"
}

lua54 "yes"`,
		'client.lua': `-- This is a client script`,
		'server.lua': `-- This is a server script`
	};

	for (const [file, contents] of Object.entries(files)) {
		await vscode.workspace.fs.writeFile(vscode.Uri.file(path + '/' + file), Buffer.from(contents + "\n"));
	}
}

function _indices(text, select, eol) {
	text = text.replace(/\r?\n/g, eol);

	const indices = [];

	let index = text.indexOf(select);

	while (index !== -1) {
		indices.push(index);

		index = text.indexOf(select, index + 1);
	}

	return indices;
}

function _indent(text, line, eol) {
	const indentation = line.match(/^[\t ]+/gm);

	if (!indentation) return text;

	const indent = indentation[0];

	return text.split(/\r?\n/g).map((line, index) => {
		if (line.trim() && index !== 0) {
			line = indent + line;
		}

		return line;
	}).join(eol);
}

async function _insert(text, select) {
	const editor = vscode.window.activeTextEditor,
		document = editor ? editor.document : null;

	if (!document) return false;

	const eol = document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";

	const edit = new vscode.WorkspaceEdit();

	const offset = editor.document.offsetAt(editor.selection.active);

	const position = editor.document.positionAt(offset);

	const line = document.lineAt(position.line).text;

	text = _indent(text, line, eol);

	edit.insert(document.uri, position, text);

	await vscode.workspace.applyEdit(edit);

	editor.selections = _indices(text, select, eol).map(index => {
		const range = new vscode.Range(editor.document.positionAt(offset + index), editor.document.positionAt(offset + (index + select.length)));

		return new vscode.Selection(range.start, range.end);
	});
}

async function insertNewEvent() {
	const text = `RegisterNetEvent("event")
AddEventHandler("event", function()
	local _source = source

	-- TODO: implement
end)`;

	await _insert(text, "event");
}

async function insertEnsureThread() {
	const text = `local isExampleThreadActive = false

local function ensureExampleThread()
	if isExampleThreadActive then
		return
	end

	isExampleThreadActive = true

	Citizen.CreateThreadNow(function()
		while true do
			-- TODO: implement

			Citizen.Wait(0)
		end

		isExampleThreadActive = false
	end)
end`;

	await _insert(text, 'Example');
}

async function organizeList() {
	const editor = vscode.window.activeTextEditor,
		document = editor ? editor.document : null;

	if (!document) return;

	const selection = editor.selection;

	const text = document.getText(selection);

	if (!text.trim()) return;

	if (!text.startsWith('{') || !text.endsWith('}')) {
		vscode.window.showErrorMessage('Selection must start and end with curly braces.');

		return;
	}

	const eol = document.eol === vscode.EndOfLine.CRLF ? "\r\n" : "\n";

	const items = text.slice(1, -1)
		.split(eol + eol)
		.map(group => {
			return parseList(group);
		});

	if (items.find(group => !group) !== undefined) {
		vscode.window.showErrorMessage('Unable to sort list. Selection has to be a list of strings and/or numbers.');

		return;
	}

	let result = '{\n' + items.map(group => formatList(group, eol)).join(',' + eol + eol) + '\n}';

	result = _indent(result, "\t" + document.lineAt(selection.anchor.line).text, eol).replace('\t}', '}');

	const edit = new vscode.WorkspaceEdit();

	edit.replace(document.uri, selection, result);

	await vscode.workspace.applyEdit(edit);
}

async function convertResourceToFxManifest(file) {
	if (!file || !file.fsPath || !file.fsPath.endsWith('__resource.lua')) return;

	const path = file.fsPath.slice(0, -14) + 'fxmanifest.lua';

	await vscode.workspace.fs.rename(file, vscode.Uri.file(path));

	const buffer = await vscode.workspace.fs.readFile(vscode.Uri.file(path));

	let text = buffer.toString();

	text = text.replace(/^resource_manifest_version .+?$/gm, '').trim();

	if (!text.match(/^games? .+?$/gm)) {
		text = `game "gta5"\n\n${text}`;
	}

	text = `fx_version "cerulean"\n\n${text}`;

	vscode.workspace.fs.writeFile(vscode.Uri.file(path), Buffer.from(text + '\n'));

	vscode.window.showInformationMessage('Converted __resource.lua to fxmanifest.lua');
}

async function collectStatistics(folder) {
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(folder);

	if (!workspaceFolder) return;

	const workspaceFolderPath = workspaceFolder.uri.path;

	const searchFolder = relative(workspaceFolderPath, folder.path).replace(/\[|\]/g, '[$&]');

	const searchPath = (searchFolder ? searchFolder + '/' : '') + '**/*.lua';

	vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'Parsing ' + basename(folder.path),
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

		const names = nativeList.map(native => [
			native.name,
			...(native.aliases || [])
		]).flat();

		let index = 0,
			natives = {};

		for (const file of files) {
			if (canceled) return;

			const percentage = Math.floor((index / files.length) * 100),
				message = percentage + '% - ' + basename(file.path);

			progress.report({
				increment: 100 / files.length,
				message: message + ' - Reading...'
			});

			const text = await vscode.workspace.fs.readFile(file).then(buffer => {
				return buffer.toString();
			});

			progress.report({
				message: message + ' - Collecting...'
			});

			const functions = findAllFunctions(text).filter(func => {
				return names.includes(func.name);
			});

			progress.report({
				message: message + ' - Counting...'
			});

			for (const func of functions) {
				const name = func.name,
					count = natives[name] || 0;

				natives[name] = count + 1;
			}

			index++;
		}

		const max = Math.max(...Object.values(natives)).toString().length;

		natives = Object.entries(natives)
			.map(([name, count]) => {
				return {
					name,
					count
				};
			}).sort((a, b) => {
				return b.count - a.count;
			});

		const text = natives.map(native => {
			return `${native.count.toString().padStart(max, ' ')} - ${native.name}`;
		}).join('\n');

		await vscode.workspace.openTextDocument({
			content: text,
			language: 'plaintext'
		});
	});
}

export function registerContextInserts(context) {
	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.createEvent', () => {
		insertNewEvent();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.createEnsureThread', () => {
		insertEnsureThread();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.createResource', folder => {
		createNewResource(folder);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.convertFxManifest', file => {
		convertResourceToFxManifest(file);
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.statistics', folder => {
		collectStatistics(folder);
	}));

	// Not really an insert but still here
	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.organizeList', () => {
		organizeList();
	}));
}

export function setContextNatives(natives) {
	nativeList = natives;
}
