export function matchAll(regex, str) {
    const matches = [];

    let m;

    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        matches.push(m);
    }

    return matches;
}