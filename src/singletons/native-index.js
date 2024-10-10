import vscode from 'vscode';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import axios from 'axios';

import Native from '../classes/native.js';
import { emit } from './event-bus.js';
import logger from './logger.js';

async function saveLoadJSON(url) {
    try {
        const response = await axios.get(url, {
            timeout: 3000
        });

        return response.data;
    } catch {
        return null;
    }
}

async function update(index) {
    logger.log('Fetching natives list...');

    const [cfx, gta] = await Promise.all([
        await saveLoadJSON('https://runtime.fivem.net/doc/natives_cfx.json'),
        await saveLoadJSON('https://runtime.fivem.net/doc/natives.json')
    ]);

    logger.log('Finished fetching natives list.');

    if (!cfx || !gta) {
        vscode.window.showWarningMessage('Failed to update natives list.');

        return;
    }

    index.clear();

    for (const data of [cfx, gta]) {
        for (const namespace in data) {
            const natives = data[namespace];

            for (const hash in natives) {
                index.add(Native.fromJSON(natives[hash]));
            }
        }
    }

    index.store();

    vscode.window.showInformationMessage('Updated natives list.');

    emit('natives');
}

class NativeIndex {
    static MaxAge = 24 * 60 * 60 * 1000;

    constructor(context) {
        this.directory = context.storagePath || context.globalStoragePath;
        this.path = join(this.directory, 'natives.json');

        this.clear();
    }

    load() {
        if (!existsSync(this.path)) {
            update(this);

            return;
        }

        const contents = readFileSync(this.path, 'utf8');

        try {
            const data = JSON.parse(contents);

            this.index = data.index;
            this.aliases = data.aliases;
            this.hashes = data.hashes;

            for (const native of data.natives) {
                this.natives.push(Native.fromData(native));
            }

            if (Date.now() - data.time > NativeIndex.MaxAge) {
                update(this);
            } else {
                logger.log('Loaded natives from disk.');

                emit('natives');
            }
        } catch {
            update(this);
        }
    }

    store() {
        if (!existsSync(this.directory)) {
            mkdirSync(this.directory, { recursive: true });
        }

        writeFileSync(this.path, JSON.stringify({
            time: Date.now(),
            natives: this.natives,
            index: this.index,
            aliases: this.aliases,
            hashes: this.hashes
        }));
    }

    clear() {
        this.natives = [];

        this.index = {
            client: {},
            server: {},
            shared: {}
        };

        this.aliases = {};
        this.hashes = {};
    }

    size() {
        return this.natives.length;
    }

    add(native) {
        const index = this.natives.push(native) - 1;

        // Add name to index
        if (native.context === 'shared') {
            this.index.client[native.name] = index;
            this.index.server[native.name] = index;
            this.index.shared[native.name] = index;
        } else {
            this.index[native.context][native.name] = index;
        }

        // Add aliases to index
        for (const alias of native.aliases) {
            this.aliases[alias] = native.name;
        }

        // Add hash to index
        if (native.name !== native.hash) {
            if (native.hash.startsWith("N_0x")) {
                this.hashes[parseInt(native.hash.slice(2), 16)] = {
                    c: native.cname,
                    lua: native.name
                };
            } else if (native.hash.startsWith("0x")) {
                this.hashes[parseInt(native.hash, 16)] = {
                    c: native.cname,
                    lua: native.name
                };
            }
        }
    }

    get(name, context) {
        if (context) {
            const contextIndex = this.index[context],
                index = contextIndex[name];

            return index !== undefined ? this.natives[index] : null;
        }

        return this.get(name, 'client') || this.get(name, 'server');
    }

    findAllInContext(context, callback) {
        const contextIndex = this.index[context],
            natives = [];

        for (const [name, index] of Object.entries(contextIndex)) {
            if (callback(name)) {
                natives.push(this.natives[index]);
            }
        }

        return natives;
    }

    search(string) {
        string = string.toLowerCase();

        return this.natives.find(native => {
            return native.name.toLowerCase().startsWith(string);
        });
    }

    searchAll(string) {
        string = string.toLowerCase();

        return this.natives.filter(native => {
            return native.name.toLowerCase().includes(string);
        });
    }

    getNameFromAlias(name) {
        return this.aliases[name];
    }

    getNameFromHash(hash, useCName = false) {
        if (hash.startsWith("N_0x")) {
            hash = parseInt(hash.slice(2), 16);
        } else if (hash.startsWith("0x")) {
            hash = parseInt(hash, 16);
        } else {
            return null;
        }

        const name = this.hashes[hash];

        return name ? (useCName ? name.c : name.lua) : null;
    }
}

let index;

export function getIndex() {
    return index;
}

export function initializeNativeIndex(context) {
    index = new NativeIndex(context);

    index.load();
}