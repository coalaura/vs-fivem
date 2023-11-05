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

    const matches = matchAll(/([\w.:]+) ?\(/g, code);

    for (const match of matches) {
        const callIndex = match.index,
            name = match[1],
            argIndex = callIndex + match[0].length;

        // Ignore definitions
        if (code.includes(`function ${name}`)) continue;

        const arguments_ = [];

        let level = 0,
            start = argIndex,
            argument = '',
            rawArguments = '';

        let end = argIndex;

        for (let index = argIndex; index < code.length; index++) {
            const char = code[index];

            if (char === '(') {
                level++;
            } else if (char === ')') {
                level--;

                // End of argument list
                if (level < 0) {
                    end = index + 1;

                    break;
                }
            }

            rawArguments += char;

            if (char === ',' && level === 0) {
                if (argument[0] === ' ') start++;

                arguments_.push({
                    value: argument.trim(),
                    start: start,
                    end: index,

                    range: _resolveRange
                });

                argument = '';
                start = index + 1;
            } else {
                argument += char;
            }
        }

        // Last argument
        if (argument) {
            if (argument[0] === ' ') start++;

            arguments_.push({
                value: argument.trim(),
                start: start,
                end: end - 1,

                range: _resolveRange
            });
        }

        calls.push({
            raw: match[0] + rawArguments + ')',
            rawArguments: rawArguments,

            name: name,
            arguments: arguments_,

            start: callIndex,
            end: end,

            range: _resolveRange
        });
    }

    return calls;
}

function _resolveRange(document) {
    const start = document.positionAt(this.start),
        end = document.positionAt(this.end);

    return new vscode.Range(start, end);
}