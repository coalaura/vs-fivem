let nativeList = [],
    indexedNatives = {};

let lastSearch = null,
    lastSearchResults = null;

function findAllFunctions(text) {
    const rgx = /(?<=^|[^\w:])([\w.]+)\s*\(\s*(.+?)\s*(\)|$)/gm;

    const matches = text.matchAll(rgx);

    return Array.from(matches).map(match => {
        const name = match[1];
        const params = match[2].trim();

        const index = match.index;

        return {
            name,
            params,
            index,
            match: match[0]
        };
    }).filter(func => func.name !== 'function');
}

function setSearchableNatives(natives) {
    nativeList = natives;

    lastSearch = null;
    lastSearchResults = null;

    indexedNatives = {};

    natives.forEach(native => {
        const start = native.name.charAt(0).toLowerCase();

        if (!indexedNatives[start]) {
            indexedNatives[start] = [];
        }

        indexedNatives[start].push(native);
    });
}

function findNative(name, ctx) {
    const start = name.charAt(0).toLowerCase();

    const natives = indexedNatives[start];

    if (!natives) return false;

    let native = natives.find(native => {
        return native.name === name && (!ctx || native.apiset === ctx);
    });

    if (!native) {
        native = natives.find(native => {
            return native.name === name;
        });

        if (!native) return false;
    }

    return native;
}

function searchNatives(search) {
    if (!search) {
        return nativeList;
    }

    if (search === lastSearch) {
        return lastSearchResults;
    }

    if (!search.startsWith(lastSearch)) {
        lastSearch = null;
        lastSearchResults = null;
    }

    if (lastSearchResults === null) {
        lastSearchResults = nativeList;
    }

    lastSearch = search;

    lastSearchResults = lastSearchResults.filter(native => {
        return native.name.includes(search);
    });

    return lastSearchResults;
}

module.exports = {
    setSearchableNatives,
    searchNatives,
    findNative,
    findAllFunctions
};
