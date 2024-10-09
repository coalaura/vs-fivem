export function matchAll(regex, str) {
    return [...str.matchAll(regex)];
}