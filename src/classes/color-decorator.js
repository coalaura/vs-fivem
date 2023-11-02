import vscode from 'vscode';

function extractColor(text) {
    // Normal RGB(A) color
    const rgba = text.match(/\d+/g);

    if (rgba && rgba.length >= 3) {
        const r = parseInt(rgba[0]),
            g = parseInt(rgba[1]),
            b = parseInt(rgba[2]),
            a = rgba[3] ? parseInt(rgba[3]) : 255;

        return { r, g, b, a };
    }

    // Hex color
    const hex = text.match(/[0-9a-z]{8}|[0-9a-z]{6}|[0-9a-z]{3}/i);

    if (hex && hex.length === 1) {
        const hexColor = hex[0];

        let r, g, b, a = 255;

        if (hexColor.length === 3) {
            r = parseInt(hexColor[0] + hexColor[0], 16);
            g = parseInt(hexColor[1] + hexColor[1], 16);
            b = parseInt(hexColor[2] + hexColor[2], 16);
        } else if (hexColor.length >= 6) {
            r = parseInt(hexColor[0] + hexColor[1], 16);
            g = parseInt(hexColor[2] + hexColor[3], 16);
            b = parseInt(hexColor[4] + hexColor[5], 16);

            if (hexColor.length === 8) {
                a = parseInt(hexColor[6] + hexColor[7], 16);
            }
        }

        return { r, g, b, a };
    }

    return false;
}

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

    add(rgba, range) {
        const color = this.toString(rgba);

        const data = this.colors[color] || { ranges: [], rgba };

        data.ranges.push(range);

        this.colors[color] = data;
    }

    render(editor) {
        for (const color in this.colors) {
            const data = this.colors[color],
                ranges = data.ranges,
                rgba = data.rgba;

            const decoration = vscode.window.createTextEditorDecorationType({
                rangeBehavior: vscode.DecorationRangeBehavior.ClosedClosed,

                backgroundColor: color,
                color: this.findContrastColor(rgba)
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
            /#([0-9a-z]{3,8})/gi,
            /rgba?\(\d+, \d+, \d+(, \d+)?\)/gi,
        ];

        this.clear();

        const text = document.getText();

        for (const regex of expressions) {
            let m;

            if ((m = regex.exec(text)) !== null) {
                const rgba = extractColor(m[0]);

                if (!rgba) continue;

                const range = new vscode.Range(
                    document.positionAt(m.index),
                    document.positionAt(m.index + m[0].length)
                );

                this.add(rgba, range);
            }
        }

        this.render(editor);
    }

    toString(rgba) {
        if (rgba.a === 0) {
            return 'rgba(0, 0, 0, 1)';
        }

        return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a / 255})`;
    }

    findContrastColor(rgba) {
        if ((rgba.r * 0.299 + rgba.g * 0.587 + rgba.b * 0.114) > 186) return '#000000';

        return '#ffffff';
    }
}