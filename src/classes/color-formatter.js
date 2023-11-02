import vscode from 'vscode';

export default class ColorFormatter extends vscode.ColorInformation {
    constructor(range, color, code, type) {
        super(range, color);

        this.code = code;
        this.type = type;
    }

    rgba(color) {
        return {
            red: Math.floor(color.red * 255),
            green: Math.floor(color.green * 255),
            blue: Math.floor(color.blue * 255),
            alpha: Math.floor(color.alpha * 255)
        };
    }

    hex(color) {
        const rgba = this.rgba(color);

        const r = rgba.red.toString(16).padStart(2, '0'),
            g = rgba.green.toString(16).padStart(2, '0'),
            b = rgba.blue.toString(16).padStart(2, '0'),
            a = rgba.alpha.toString(16).padStart(2, '0');

        if (rgba.alpha === 255) {
            return `${r}${g}${b}`;
        }

        return `${r}${g}${b}${a}`;
    }

    format(color) {
        // Hex colors
        if (this.type === 'hex3') {
            return this.code.replace(/[0-9a-f]{3}/, this.hex(color));
        } else if (this.type === 'hex6') {
            return this.code.replace(/[0-9a-f]{6}/, this.hex(color));
        } else if (this.type === 'hex8') {
            return this.code.replace(/[0-9a-f]{8}/, this.hex(color));
        }

        // RGB(A) colors
        const rgba = this.rgba(color),
            colorData = [rgba.red, rgba.green, rgba.blue, rgba.alpha];

        let index = 0;

        return this.code.replace(/\d+/g, match => {
            return colorData[index++] || match;
        });
    }

    present(color) {
        return new vscode.ColorPresentation(this.format(color));
    }
}