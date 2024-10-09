import vscode from 'vscode';
import fetch from 'node-fetch';
import {writeFileSync} from 'fs';
import {join} from 'path';

import Native from './classes/native.js';
import nativeIndex from './singletons/native-index.js';
import { emit } from './singletons/event-bus.js';

async function fetchNatives(state, url) {
    const controller = new AbortController(),
        timeout = setTimeout(() => controller.abort(), 3000);

    const response = await fetch(url, {
        signal: controller.signal
    });

    clearTimeout(timeout);

    const data = (await response.json()) || state.get(url);

    if (!data) return false;

    state.update(url, data);

    for (const namespace in data) {
        const natives = data[namespace];

        for (const hash in natives) {
            nativeIndex.add(new Native(natives[hash]));
        }
    }

    return true;
}

export function resolveAllNatives(context) {
    vscode.window.withProgress({
        location: vscode.ProgressLocation.Window,
        cancellable: false,
        title: 'Fetching Natives'
    }, async (progress) => {
        progress.report({ increment: 10 });

        const ok1 = await fetchNatives(context.globalState, 'https://runtime.fivem.net/doc/natives_cfx.json');
        const ok2 = await fetchNatives(context.globalState, 'https://runtime.fivem.net/doc/natives.json');

        if (!ok1 || !ok2) {
            vscode.window.showWarningMessage('Failed to update natives list.');
        }

        progress.report({ increment: 60 });

        const types = nativeIndex.natives.map(native => {
            const types = [];

            native.parameters.map(param => {
                types.push(param.type);
            });

            native.returns.map(ret => {
                types.push(ret.type);
            });

            return types;
        }).flat().filter((value, index, self) => self.indexOf(value) === index);

        writeFileSync(join(__dirname, 'types.json'), JSON.stringify(types, null, 4));

        emit('natives');

        progress.report({ increment: 100 });
    });
}