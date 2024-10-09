import vscode from 'vscode';
import { readFileSync } from 'fs';
import { join } from 'path';
import { parse as marked } from 'marked';

import { getIndex } from '../singletons/native-index.js';

export default class ViewProvider {
    constructor() {
        this.search = '';
        this.actualSearch = '';

        this.webview = null;
        this.viewer = null;
    }

    refresh() {
        this.sendSearchData();
    }

    sendSearchData() {
        if (!this.webview) return;

        const index = getIndex();

        if (!index) return;

        const results = (this.search ? index.searchAll(this.search) : index.natives).map(native => {
            return {
                name: native.name,
                detail: native.detail(),
                ns: native.namespace
            };
        });

        results.sort((a, b) => {
            return a.ns.localeCompare(b.ns);
        });

        this.webview.postMessage({
            type: 'search',
            search: this.actualSearch,
            results: results,
            total: index.size()
        });
    }

    resolveWebviewView(webviewView) {
        this.webview = webviewView.webview;

        const html = readFileSync(join(__dirname, 'view', 'view.html'), 'utf8'),
            template = readFileSync(join(__dirname, 'view', 'native.html'), 'utf8');

        this.webview.title = 'FiveM Natives';
        this.webview.html = html;

        this.webview.options = {
            enableScripts: true
        };

        this.webview.onDidReceiveMessage(message => {
            const type = message.type,
                value = message.value;

            if (type === 'search') {
                this.actualSearch = value.trim();

                const searchTerm = this.actualSearch.toLowerCase();

                if (searchTerm !== this.search) {
                    this.search = searchTerm;

                    this.sendSearchData();
                }
            } else if (type === 'select') {
                const native = getIndex().search(value);

                if (native) {
                    if (!this.viewer) {
                        this.viewer = vscode.window.createWebviewPanel('vs-fivem.nativeView', native.name, vscode.ViewColumn.One, {
                            enableScripts: true
                        });

                        this.viewer.onDidDispose(() => {
                            this.viewer = null;
                        });
                    }

                    this.viewer.title = native.name;

                    const markdown = native.documentation().join('\n\n');

                    this.viewer.webview.html = template.replace('{html}', marked(markdown));
                }
            }
        });

        webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                this.sendSearchData();
            }
        });

        const index = getIndex();

        if (index && index.size() > 0) {
            this.sendSearchData();
        }
    }
}