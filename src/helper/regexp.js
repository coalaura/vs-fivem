import vscode from 'vscode';

export function matchAll(regex, str) {
    const matches = [];

    let m;

    while ((m = regex.exec(str)) !== null) {
        if (m.index === regex.lastIndex) regex.lastIndex++;

        matches.push(m);
    }

    return matches;
}

export function extractAllFunctionCalls(code) {
    const calls = [];

    const matches = matchAll(/\b([a-zA-Z_][\w_]*)(?:\.)?([^()\s]+)(?=\()/g, code);

    for (const match of matches) {
        const callIndex = match.index,
            name = match[0];

        let args = [],
            arg = '',
            argStart = callIndex + name.length + 1;

        let escaped = false,
            quoted = false,
            squoted = false,
            brackets = 0,
            index = argStart;

        for (index; index < code.length; index++) {
            const char = code[index];

            if (escaped) {
                escaped = false;
            } else if (char === '\\') {
                escaped = true;
            } else if (char === '"') {
                quoted = !quoted;
            } else if (char === "'") {
                squoted = !squoted;
            } else if (char === '(') {
                brackets++;
            } else if (char === ')') {
                brackets--;
            } else if (char === ',' && brackets === 0) {
                arg && args.push(_argument(arg, argStart, index));

                arg = '';
                argStart = index + 1;

                continue;
            }

            if (brackets < 0) break;

            arg += char;
        }

        arg && args.push(_argument(arg, argStart, index));

        const rawArguments = args.map(arg => arg.value).join(', ').trim();

        calls.push({
            raw: `${name}(${rawArguments})`,
            rawArguments: rawArguments,

            name: name,
            arguments: args,

            start: callIndex,
            end: index + 1,

            range: _resolveRange
        });
    }

    return calls;
}

function _argument(value, start, end) {
    return {
        value: value.trim(),
        start: start,
        end: end,

        range: _resolveRange
    };
}

function _resolveRange(document) {
    const start = document.positionAt(this.start),
        end = document.positionAt(this.end);

    return new vscode.Range(start, end);
}