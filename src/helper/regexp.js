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

    const matches = matchAll(/([\w.:]+) ?\((.*?)\)(?=$|;)/gm, code);

    for (const match of matches) {
        const callIndex = match.index,
            argIndex = match.index + match[0].indexOf(match[2]),
            name = match[1],
            rawArguments = match[2];

        // Ignore definitions
        if (code.includes(`function ${name}`)) continue;

        let arguments_ = [];

        // Nested function calls
        if (rawArguments.includes('(')) {
            let level = 0,
                start = 0,
                argument = '';

            for (let index = 0; index < rawArguments.length; index++) {
                const char = rawArguments[index];

                if (char === '(') {
                    level++;
                } else if (char === ')') {
                    level--;
                }

                if (char === ',' && level === 0) {
                    if (argument[0] === ' ') start++;

                    arguments_.push({
                        value: argument.trim(),
                        start: argIndex + start,
                        end: argIndex + index,

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
                    start: argIndex + start,
                    end: argIndex + rawArguments.length,

                    range: _resolveRange
                });
            }
        } else if (rawArguments) {
            let offset = 0;

            arguments_ = rawArguments.split(',').map(argument => {
                let start = rawArguments.indexOf(argument, offset),
                    end = start + argument.length;

                offset = end;

                if (argument[0] === ' ') start++;

                return {
                    value: argument.trim(),
                    start: argIndex + start,
                    end: argIndex + end,

                    range: _resolveRange
                };
            });
        }

        calls.push({
            raw: match[0],
            rawArguments: rawArguments,

            name: name,
            arguments: arguments_,

            start: callIndex,
            end: callIndex + match[0].length,

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