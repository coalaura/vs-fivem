import luaparse from 'luaparse';

export function parse(code) {
    try {
        const tree = luaparse.parse(code, {
            locations: true,
            ranges: true,
            comments: false,
            luaVersion: '5.3'
        });

        return {
            tree: tree,
            error: false
        };
    } catch (error) {
        return {
            tree: null,
            error: {
                column: error.column,
                line: error.line,
                message: error.message
            }
        };
    }
}

export function visitFunctions(tree, callback) {
    const stack = [tree];

    while (stack.length > 0) {
        const node = stack.pop();

        if (node.type === 'CallExpression') {
            const name = getFunctionName(node.base),
                args = getFunctionArguments(node),
                line = node.loc.start.line,
                column = node.loc.start.column;

            callback(name, args, {
                start: {
                    line: line,
                    column: column
                },
                end: {
                    line: line,
                    column: column + name.length
                }
            });
        }

        for (const key in node) {
            if (!node.hasOwnProperty(key)) continue;

            const child = node[key];

            if (Array.isArray(child)) {
                for (let i = child.length - 1; i >= 0; i--) {
                    const c = child[i];

                    if (c && typeof c.type === 'string') {
                        stack.push(c);
                    }
                }
            } else if (child && typeof child.type === 'string') {
                stack.push(child);
            }
        }
    }
}

function getFunctionName(node) {
    if (node.type === 'Identifier') {
        return node.name;
    } else if (node.type === 'MemberExpression') {
        return `${getFunctionName(node.base)}.${node.identifier.name}`;
    } else {
        return '(anonymous)';
    }
}

function getFunctionArguments(node) {
    return node.arguments.map(argument => {
        let type, value;

        switch (argument.type) {
            case 'StringLiteral':
                type = 'string';
                value = argument.value;

                break;
            case 'NumericLiteral':
                type = argument.value && Number.isInteger(argument.value) ? 'integer' : 'number';
                value = argument.value;

                break;
            case 'BooleanLiteral':
                type = 'boolean';
                value = argument.value;

                break;
            case 'NilLiteral':
                type = 'nil';
                value = null;

                break;
            case 'TableConstructorExpression':
                type = 'table';
                value = 'table';

                break;
            case 'FunctionExpression':
                type = 'function';
                value = 'function';

                break;
            default:
                type = 'any';
                value = 'any';
        }

        return {
            type: type,
            value: value,
            start: argument.loc.start,
            end: argument.loc.end
        };
    });
}
