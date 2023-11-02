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
            name = match[1],
            rawArguments = match[2].trim();

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
                    if (level === 0) {
                        start = index + 1;
                    }

                    level++;
                } else if (char === ')') {
                    level--;
                }

                if (char === ',' && level === 0) {
                    arguments_.push({
                        value: argument.trim(),
                        start: callIndex + start,
                        end: callIndex + index,

                        range: _resolveRange
                    });

                    argument = '';
                } else {
                    argument += char;
                }
            }

            // Last argument
            if (argument) {
                arguments_.push({
                    value: argument.trim(),
                    start: callIndex + start,
                    end: callIndex + rawArguments.length,

                    range: _resolveRange
                });
            }
        } else if (rawArguments) {
            let offset = 0;

            arguments_ = rawArguments.split(',').map(param => {
                const start = callIndex + rawArguments.indexOf(param, offset),
                    end = start + param.length;

                offset = end + 1;

                return {
                    value: param.trim(),
                    start: start,
                    end: end,

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