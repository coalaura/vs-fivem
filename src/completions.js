import vscode from 'vscode';

import snippets from './data/snippets.js';
import { getIndex } from './singletons/native-index.js';
import { getFileContext } from './helper/natives.js';

export function registerCompletions(context) {
    vscode.languages.registerCompletionItemProvider('lua', {
        provideCompletionItems(document, position) {
            const wordRange = document.getWordRangeAtPosition(position, /[\w.:]+/),
                word = wordRange ? document.getText(wordRange) : false;

            if (!word) return [];

            const index = getIndex();

            const result = [];

            // Natives
            {
                const ctx = getFileContext(document.fileName),
                    natives = index.findAllInContext(ctx, name => {
                        return name.startsWith(word);
                    });

                if (natives.length) {
                    result.push(...natives.map(native => native.complete(ctx)))
                }
            }

            // Snippets
            {
                const found = snippets.filter(snippet => snippet.prefix.startsWith(word));

                if (found.length) {
                    result.push(...found.map(snippet => {
                        const item = new vscode.CompletionItem(snippet.prefix, vscode.CompletionItemKind.Snippet);

                        item.insertText = new vscode.SnippetString(snippet.body);
                        item.documentation = snippet.description;

                        return item;
                    }));
                }
            }

            return result;
        }
    }, null, context.subscriptions);
}