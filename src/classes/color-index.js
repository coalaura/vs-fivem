import vscode from 'vscode';

import ColorFormatter from './color-formatter.js';

export default class ColorIndex {
    constructor() {
        this.colors = {};
    }

    clear() {
        this.colors = {};
    }

    key(range) {
        const start = range.start;

        return `${start.line}:${start.character}`;
    }

    add(document, index, rgba, code, type) {
        const color = new vscode.Color(
            rgba.r / 255.0,
            rgba.g / 255.0,
            rgba.b / 255.0,
            rgba.a / 255.0
        );

        const range = new vscode.Range(
            document.positionAt(index),
            document.positionAt(index + code.length)
        );

        const formatter = new ColorFormatter(range, color, code, type);

        this.colors[this.key(range)] = formatter;
    }

    get(range, newColor) {
        const formatter = this.colors[this.key(range)];

        if (!formatter) return null;

        return new vscode.ColorPresentation(formatter.format(newColor));
    }

    all() {
        return Object.values(this.colors);
    }
}