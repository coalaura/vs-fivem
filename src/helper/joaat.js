export function joaat(input) {
    // GetHashKey always lowercases the string
    input = input.toLowerCase();

    let hash = 0;

    for (let i = 0; i < input.length; i++) {
        const charCode = input.charCodeAt(i);

        hash += charCode;
        hash += (hash << 10);
        hash ^= (hash >>> 6);
    }

    hash += (hash << 3);
    hash ^= (hash >>> 11);
    hash += (hash << 15);

    // Convert the result to a signed 32-bit integer
    return hash | 0;
}