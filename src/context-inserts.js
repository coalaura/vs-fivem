import vscode from 'vscode';

import { readdirSync, existsSync, mkdirSync, statSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

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

	function buildResource(base, dir = '') {
		const dirPath = join(base, dir),
			files = readdirSync(dirPath);

		const dist = join(path, dir);

		if (!existsSync(dist)) {
			mkdirSync(dist);
		}

		for (const file of files) {
			const srcPath = join(dirPath, file);

			const isDir = statSync(srcPath).isDirectory();

			if (isDir) {
				buildResource(base, join(dir, file));
			} else {
				const distPath = join(dist, file);

				const content = readFileSync(srcPath, 'utf8');

				writeFileSync(distPath, content.replace(/\[resource\]/g, name));
			}
		}
	}

	buildResource(join(__dirname, './templates/[resource]'));
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

export function registerContextInserts(context) {
	vscode.commands.registerCommand('vs-fivem.createEvent', () => {
		insertNewEvent();
	}, null, context.subscriptions);

	vscode.commands.registerCommand('vs-fivem.createEnsureThread', () => {
		insertEnsureThread();
	}, null, context.subscriptions);

	vscode.commands.registerCommand('vs-fivem.createResource', folder => {
		createNewResource(folder);
	}, null, context.subscriptions);

	vscode.commands.registerCommand('vs-fivem.convertFxManifest', file => {
		convertResourceToFxManifest(file);
	}, null, context.subscriptions);
}
