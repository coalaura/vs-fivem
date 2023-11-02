import vscode from 'vscode';

import { createNativeDocumentation, getPositionContext } from './natives.js';
import { isSupportingLuaGLM } from './luaparse.js';
import { findNative } from './search.js';

function joaat(input) {
    // GetHashKey always lowercases the string
    input = input.toLowerCase();

    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);

        hash += charCode;
        hash += (hash << 10);
        hash ^= (hash >>> 6);
    }

    hash += (hash << 3);
    hash ^= (hash >>> 11);
    hash += (hash << 15);

    // Convert the result to a signed 32-bit integer
    return hash | 0;
}

export function registerHoverProvider(context) {
    const hoverDisposable = vscode.languages.registerHoverProvider('lua', {
        provideHover(document, position) {
            // Vector swizzle support
            if (isSupportingLuaGLM()) {
                const wordRange = document.getWordRangeAtPosition(position, /\.[\w]+/),
                    word = wordRange ? document.getText(wordRange) : false;

                if (word && word.match(/^\.[xyz]{2,}$/m)) {
                    const swizzle = word.substring(1).split('');

                    const text = `\`= vec${swizzle.length}(${swizzle.join(', ')})\``;

                    return new vscode.Hover(text, wordRange);
                }
            }

            // Joaat hash preview
            {
                const wordRange = document.getWordRangeAtPosition(position, /['"`]([^\s]+?)['"`]/),
                    word = wordRange ? document.getText(wordRange) : false;

                if (word && word.match(/^['"`][^\s]+?['"`]$/m)) {
                    const before = document.getText(new vscode.Range(new vscode.Position(wordRange.start.line, 0), wordRange.start));

                    if (!before.match(/(GetHashKey|joaat)\($/m) && !word.match(/^`[^\s]+?`$/m)) return;

                    const str = word.replace(/^['"`]|['"`]$/gm, ''),
                        hash = joaat(str),
                        unsignedHex = (hash >>> 0).toString(16).toUpperCase();

                    const text = `**JOAAT:** \`${hash}\` / \`0x${unsignedHex}\``;

                    return new vscode.Hover(text, wordRange);
                }
            }

            // Native documentations
            const ctx = getPositionContext(document, position);

            if (!ctx.name) return;

            const native = findNative(ctx.name, ctx.ctx);

            if (!native) return;

            return new vscode.Hover(createNativeDocumentation(native));
        }
    });

    context.subscriptions.push(hoverDisposable);
}