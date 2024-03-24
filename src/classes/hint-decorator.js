import vscode from 'vscode';

export default class HintDecorator {
    constructor() {
        this.hints = {};
        this.decorations = [];

        this.providers = [];
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

    registerProvider(provider) {
        this.providers.push(provider);
    }

    updateDecorations(editor, document) {
        this.clear();

        const text = document.getText();

        for (const provider of this.providers) {
            const matches = provider(text);

            for (const match of matches) {
                const hint = match.hint,
                    index = match.index;

                const range = new vscode.Range(
                    document.positionAt(index),
                    document.positionAt(index)
                );

                this.add(hint, range);
            }
        }

        this.render(editor);
    }
}