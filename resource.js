const vscode = require('vscode');

const { parseList, formatList } = require('./helper.js');

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

	await _insert(text, "Example");
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

function registerContextInserts(context) {
	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.createEvent', () => {
		insertNewEvent();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.createEnsureThread', () => {
		insertEnsureThread();
	}));

	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.createResource', folder => {
		createNewResource(folder);
	}));

	// Not really an insert but still here
	context.subscriptions.push(vscode.commands.registerCommand('vs-fivem.organizeList', () => {
		organizeList();
	}));
}

module.exports = {
	createNewResource,
	registerContextInserts
};
