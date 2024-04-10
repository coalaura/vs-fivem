import { resolveAllNatives } from './fetch-natives.js';

import { registerColorDecorator } from './colors.js';
import { registerCompletions } from './completions.js';
import { registerDiagnostics } from './diagnostics.js';
import { registerHintDecorator } from './hints.js';
import { registerHoverProvider } from './hover.js';
import { registerContextInserts } from './context-inserts.js';
import { registerWebViewProvider } from './webview.js';
import { registerJSONCommands } from './json.js';

let activated = false;

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
	if (activated) return;

	activated = true;

	// Fetch natives
	resolveAllNatives(context);

	// Register features
	registerColorDecorator(context);
	registerCompletions(context);
	registerDiagnostics(context);
	registerHintDecorator(context);
	registerHoverProvider(context);
	registerContextInserts(context);
	registerWebViewProvider(context);
	registerJSONCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
