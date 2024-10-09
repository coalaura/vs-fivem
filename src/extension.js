import { buildFullIndex } from './definitions.js';
import { initializeEventIndex } from './singletons/definition-index.js';
import { initializeNativeIndex } from './singletons/native-index.js';

import { registerColorDecorator } from './colors.js';
import { registerCompletions } from './completions.js';
import { registerDiagnostics } from './diagnostics.js';
import { registerHintDecorator } from './hints.js';
import { registerHoverProvider } from './hover.js';
import { registerContextInserts } from './context-inserts.js';
import { registerWebViewProvider } from './webview.js';
import { registerDefinitionProvider } from './definitions.js';
import { registerJSONCommands } from './json.js';
import { registerJOAATCommands } from './joaat.js';

let activated = false;

/**
 * @param {vscode.ExtensionContext} context
 */
export function activate(context) {
	if (activated) return;

	activated = true;

	// Fetch natives
	initializeNativeIndex(context);

	// Build index
	initializeEventIndex(context);
	buildFullIndex();

	// Register features
	registerColorDecorator(context);
	registerCompletions(context);
	registerDiagnostics(context);
	registerHintDecorator(context);
	registerHoverProvider(context);
	registerContextInserts(context);
	registerWebViewProvider(context);
	registerDefinitionProvider(context);
	registerJSONCommands(context);
	registerJOAATCommands(context);
}

// This method is called when your extension is deactivated
export function deactivate() { }
