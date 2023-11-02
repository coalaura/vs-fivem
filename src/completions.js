import vscode from 'vscode';

import nativeIndex from './singletons/native-index.js';
import { getFileContext } from './helper/natives.js';

export function registerCompletions(context) {
    vscode.languages.registerCompletionItemProvider('lua', {
        provideCompletionItems(document, position) {
            const wordRange = document.getWordRangeAtPosition(position, /[\w]+/),
                word = wordRange ? document.getText(wordRange) : false;

            if (!word) return [];

            const ctx = getFileContext(document.fileName),
                natives = nativeIndex.findAllInContext(ctx, name => {
                    return name.startsWith(word);
                });

            if (!natives.length) return [];

            return natives.map(native => native.complete(ctx));
        }
    }, null, context.subscriptions);
}