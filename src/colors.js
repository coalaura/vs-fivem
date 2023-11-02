import vscode from 'vscode';

import ColorIndex from './classes/color-index.js';

const colorIndex = new ColorIndex();

function getColorPatterns() {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get('colorPatterns');
}

function provideColors(document) {
    const patterns = getColorPatterns();

    if (!patterns || !Array.isArray(patterns) || !patterns.length) return [];

    colorIndex.clear();

    const text = document.getText();

    for (const pattern of patterns) {
        const regex = new RegExp(pattern, 'gmi');

        let m;

        while ((m = regex.exec(text)) !== null) {
            if (m.index === regex.lastIndex) regex.lastIndex++;

            const color = m[0];

            // Normal RGB(A) color
            const rgba = color.match(/\d+/g);

            if (rgba && rgba.length >= 3) {
                const r = parseInt(rgba[0]),
                    g = parseInt(rgba[1]),
                    b = parseInt(rgba[2]),
                    a = rgba[3] ? parseInt(rgba[3]) : 255;

                colorIndex.add(document, m.index, { r, g, b, a }, color, 'rgba');

                continue;
            }

            // Hex color
            const hex = color.match(/[0-9a-f]{3,8}/gi);

            if (hex && hex.length === 1) {
                const hexColor = hex[0];

                let r, g, b, a = 255, t;

                if (hexColor.length === 3) {
                    r = parseInt(hexColor[0] + hexColor[0], 16);
                    g = parseInt(hexColor[1] + hexColor[1], 16);
                    b = parseInt(hexColor[2] + hexColor[2], 16);

                    t = 'hex3';
                } else if (hexColor.length >= 6) {
                    r = parseInt(hexColor[0] + hexColor[1], 16);
                    g = parseInt(hexColor[2] + hexColor[3], 16);
                    b = parseInt(hexColor[4] + hexColor[5], 16);

                    t = 'hex6';

                    if (hexColor.length === 8) {
                        a = parseInt(hexColor[6] + hexColor[7], 16);

                        t = 'hex8';
                    }
                }

                if (r !== undefined && g !== undefined && b !== undefined) {
                    colorIndex.add(document, m.index, { r, g, b, a }, color, t);
                }
            }
        }
    }

    return colorIndex.all();
}

export function registerColorProvider(context) {
    context.subscriptions.push(vscode.languages.registerColorProvider('lua', {
        provideColorPresentations(color, context) {
            const present = colorIndex.get(context.range, color);

            if (!present) return [];

            return [present];
        },

        provideDocumentColors(document) {
            return provideColors(document);
        }
    }));
}