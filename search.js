let nativeList = [];

let lastSearch = null,
    lastSearchResults = null;

function setSearchableNatives(natives) {
    nativeList = natives;

    lastSearch = null;
    lastSearchResults = null;
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
    searchNatives
};
