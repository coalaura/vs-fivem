import vscode from 'vscode';

import { parse, visitFunctions } from '../parser.js';

export default class HintDecorator {
    constructor() {
        this.hints = {};
        this.decorations = [];

        this.providers = {};
    }

    clear() {
        this.hints = {};

        for (const decoration of this.decorations) {
            decoration.dispose();
        }

        this.decorations = [];
    }

    add(hint, range) {
        const data = this.hints[hint] || { ranges: [], hint: hint };

        data.ranges.push(range);

        this.hints[hint] = data;
    }

    render(editor) {
        for (const hint in this.hints) {
            const data = this.hints[hint],
                ranges = data.ranges;

            const decoration = vscode.window.createTextEditorDecorationType({
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,

                after: {
                    contentText: ' 🡒 ' + hint,
                    color: { id: 'editorInlayHint.foreground' },
                    fontStyle: 'italic',
                }
            });

            this.decorations.push(decoration);

            editor.setDecorations(
                decoration,
                ranges
            );
        }
    }

    registerProvider(functions, provider) {
        for (const func in functions) {
            const index = functions[func];

            this.providers[func] = {
                index: index,
                provider: provider
            };
        }
    }

    updateDecorations(editor, document) {
        this.clear();

        const text = document.getText();

        const { tree, error } = parse(text);

        if (error) return;

        visitFunctions(tree, (name, args, location) => {
            const provider = this.providers[name];

            if (!provider || args.length < provider.index) return;

            const arg = args[provider.index],
                hint = provider.provider(name, arg);

            if (!hint) return;

            const start = arg.start,
                end = arg.end;

            const range = new vscode.Range(
                new vscode.Position(start.line - 1, start.column),
                new vscode.Position(end.line - 1, end.column)
            );

            this.add(hint, range);
        });

        this.render(editor);
    }
}