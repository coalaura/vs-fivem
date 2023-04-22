const vscode = require('vscode'),
    fs = require('fs'),
    path = require('path'),
    marked = require('marked');

const { createNativeDocumentation } = require('./natives.js');

let provider = null,
    natives = [];

class Provider {
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

        let results = [];

        if (this.search) {
            results = natives.filter(native => {
                const name = native.name.toLowerCase();

                return name.includes(this.search);
            }).map(native => {
                return {
                    id: native.id,
                    name: native.name,
                    detail: native.detail,
                    ns: native.ns
                };
            });

            results.sort((a, b) => {
                return a.ns.localeCompare(b.ns);
            });
        }

        this.webview.postMessage({
            type: 'search',
            search: this.actualSearch,
            results: results,
            total: natives.length
        });
    }

    resolveWebviewView(webviewView) {
        this.webview = webviewView.webview;

        const html = fs.readFileSync(path.join(__dirname, 'view', 'view.html'), 'utf8'),
            template = fs.readFileSync(path.join(__dirname, 'view', 'native.html'), 'utf8');

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
                const native = natives.find(native => native.id === value);

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

                    const markdown = createNativeDocumentation(native, true).join('\n\n');

                    this.viewer.webview.html = template.replace('{html}', marked.parse(markdown));
                }
            }
        });

        webviewView.onDidChangeVisibility(() => {
            if (webviewView.visible) {
                this.sendSearchData();
            }
        });
    }
}

function setNatives(newNatives) {
    natives = newNatives.map((native, index) => {
        native.id = 'n' + index;

        return native;
    });

    natives.sort((a, b) => {
        const aName = a.name.startsWith('0x') ? a.name : '~' + a.name,
            bName = b.name.startsWith('0x') ? b.name : '~' + b.name;

        return aName.localeCompare(bName);
    });

    if (provider) {
        provider.refresh();
    }
}

function registerWebViewProvider(context) {
    provider = new Provider();

    const providerDisposable = vscode.window.registerWebviewViewProvider('vs-fivem.search', provider);

    context.subscriptions.push(providerDisposable);
}

module.exports = {
    setNatives,
    registerWebViewProvider
}
