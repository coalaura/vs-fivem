import vscode from 'vscode';

import { on } from './singletons/event-bus.js';
import ViewProvider from './classes/view-provider.js';

export function registerWebViewProvider(context) {
    const provider = new ViewProvider();

    vscode.window.registerWebviewViewProvider('vs-fivem.search', provider, null, context.subscriptions);

    on('natives', () => {
        provider.refresh();
    });
}
