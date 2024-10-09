import vscode from 'vscode';

import { matchAll } from '../helper/regexp.js';

export default class ColorDecorator {
    constructor() {
        this.colors = {};
        this.decorations = [];
    }

    clear() {
        this.colors = {};

        for (const decoration of this.decorations) {
            decoration.dispose();
        }

        this.decorations = [];
    }

    add(hex, range) {
        const data = this.colors[hex] || {
            ranges: [],
            bg: hex,
            fg: this.findContrastColor(hex)
        };

        data.ranges.push(range);

        this.colors[hex] = data;
    }

    render(editor) {
        for (const hex in this.colors) {
            const data = this.colors[hex],
                ranges = data.ranges;

            const decoration = vscode.window.createTextEditorDecorationType({
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,

                backgroundColor: data.bg,
                color: data.fg
            });

            this.decorations.push(decoration);

            editor.setDecorations(
                decoration,
                ranges
            );
        }
    }

    updateDecorations(editor, document) {
        const expressions = [
            /(?<=['"]#)[0-9a-f]{3,6}/gi,
            /(?<=rgba?\()(\d+), ?(\d+), ?(\d+)(?=[^\)]*\))/gi,
        ];

        this.clear();

        const text = document.getText();

        for (const regex of expressions) {
            const matches = matchAll(regex, text);

            for (const match of matches) {
                let hex;

                if (match.length === 1) {
                    hex = match[0];

                    if (hex.length === 3) {
                        hex = `#${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
                    } else if (hex.length === 6) {
                        hex = `#${hex}`;
                    } else {
                        continue;
                    }
                } else if (match.length === 4) {
                    const r = parseInt(match[1]),
                        g = parseInt(match[2]),
                        b = parseInt(match[3]);

                    hex = `#${r.toString(16)}${g.toString(16)}${b.toString(16)}`;
                }

                if (!hex || hex.length !== 7) continue;

                const range = new vscode.Range(
                    document.positionAt(match.index),
                    document.positionAt(match.index + match[0].length)
                );

                this.add(hex.toLowerCase(), range);
            }
        }

        this.render(editor);
    }

    findContrastColor(hex) {
        const r = parseInt(hex.slice(1, 3), 16),
            g = parseInt(hex.slice(3, 5), 16),
            b = parseInt(hex.slice(5, 7), 16);

        if ((r * 0.299 + g * 0.587 + b * 0.114) > 186) return '#000000';

        return '#ffffff';
    }
}