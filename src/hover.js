import vscode from 'vscode';

import { getIndex } from './singletons/native-index.js';
import { joaat } from './helper/joaat.js';
import { getFileContext } from './helper/natives.js';

export function registerHoverProvider(context) {
    vscode.languages.registerHoverProvider(
        { scheme: 'file', language: 'lua' },
        {
            provideHover(document, position) {
                // Vector swizzle support
                {
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
                const wordRange = document.getWordRangeAtPosition(position, /[\w]+/),
                    word = wordRange ? document.getText(wordRange) : false;

                if (!word) return;

                const ctx = getFileContext(document.fileName),
                    native = getIndex().get(word, ctx);

                if (!native) return;

                return new vscode.Hover(native.documentation());
            }
        }, null, context.subscriptions);
}