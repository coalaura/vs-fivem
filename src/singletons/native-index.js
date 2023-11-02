class NativeIndex {
    constructor() {
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
            this.hashes['N_' + native.hash.toUpperCase()] = native.name;
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

    getNameFromHash(hash) {
        hash = hash.toUpperCase();

        return this.hashes[hash];
    }
}

const index = new NativeIndex();

export default index;