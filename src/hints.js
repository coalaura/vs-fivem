import vscode from 'vscode';

import { getPedConfigFlagName } from './data/ped-config-flags.js';
import { getPedTaskName } from './data/ped-tasks.js';
import { matchAll } from './helper/regexp.js';
import { showInlineHints } from './helper/config.js';
import HintDecorator from './classes/hint-decorator.js';

const decorator = new HintDecorator();

function updateDecorationsIfNeeded(document) {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) return;

    document = document || activeEditor.document;

    if (!document || activeEditor.document !== document) return;

    if (document.languageId !== 'lua' || !showInlineHints()) {
        decorator.clear();

        return;
    }

    decorator.updateDecorations(activeEditor, document);
}

function registerProviders() {
    // SetPedConfigFlag & GetPedConfigFlag
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=[SG]etPedConfigFlag\s*\(.+?,\s*)\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                flag = getPedConfigFlagName(id);

            return {
                hint: flag,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // GetIsTaskActive
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=GetIsTaskActive\s*\(.+?,\s*)\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                task = getPedTaskName(id);

            return {
                hint: task,
                index: match.index + match[0].length
            };
        });
    });
}

export function registerHintDecorator(context) {
    registerProviders();

    updateDecorationsIfNeeded(false);

    vscode.window.onDidChangeActiveTextEditor(() => {
        updateDecorationsIfNeeded(false);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        updateDecorationsIfNeeded(event.document);
    }, null, context.subscriptions);
}