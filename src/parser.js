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
    return node.arguments.map(argument => getArgument(argument));
}

function getArgument(argument) {
    const result = evaluateType(argument);

    let type, value;

    if (result) {
        type = result.type;
        value = result.value;
    } else {
        type = 'any';
        value = 'any';
    }

    return {
        type: type,
        value: value,
        start: argument.loc.start,
        end: argument.loc.end
    };
}

function evaluateType(node) {
    const value = node.value,
        raw = node.raw;

    switch (node.type) {
        // Literal types
        case 'StringLiteral':
            return {
                type: 'string',
                value: raw.substring(1, raw.length - 1),
                string: true
            };
        case 'NumericLiteral':
            const integer = Number.isInteger(value) && !raw.includes('.');

            return {
                type: integer ? 'integer' : 'number',
                value: Number(value),
                number: true,
                integer: integer
            };
        case 'BooleanLiteral':
            return {
                type: 'boolean',
                value: Boolean(value),
                boolean: true
            };
        case 'NilLiteral':
            return {
                type: 'nil',
                value: null
            };
        case 'TableConstructorExpression':
            return {
                type: 'table',
                value: { _table: true }
            };
        case 'FunctionExpression':
            return {
                type: 'function',
                value: () => { }
            };

        // Expressions
        case 'BinaryExpression':
        case 'UnaryExpression':
        case 'LogicalExpression':
            return evaluateExpression(node);
    }

    return false;
}

function evaluateExpression(node) {
    const expressionType = node.type,
        operator = node.operator;

    switch (expressionType) {
        case 'BinaryExpression':
            {
                const left = evaluateType(node.left),
                    right = evaluateType(node.right);

                // Number binary expressions
                if (left?.number && right?.number) {
                    let value, type = right.integer && left.integer ? 'integer' : 'number';

                    if (operator === '+') {
                        value = left.value + right.value;
                    } else if (operator === '-') {
                        value = left.value - right.value;
                    } else if (operator === '*') {
                        value = left.value * right.value;
                    } else if (operator === '/') {
                        value = left.value / right.value;
                    } else if (operator === '%') {
                        value = left.value % right.value;
                    } else if (operator === '^') {
                        value = Math.pow(left.value, right.value);
                    } else if (operator === '==') {
                        type = 'boolean';
                        value = left.value === right.value;
                    } else if (operator === '~=') {
                        type = 'boolean';
                        value = left.value !== right.value;
                    }

                    if (value === undefined) {
                        return false;
                    }

                    return {
                        type: type,
                        value: value,
                        number: type !== 'boolean',
                        integer: type === 'integer',
                        boolean: type === 'boolean'
                    };
                }

                // String binary expressions
                if (left?.string && right?.string) {
                    if (operator === '..') {
                        return {
                            type: 'string',
                            value: left.value + right.value,
                            string: true
                        };
                    }

                    return false;
                }

                // Boolean binary expressions
                if (left?.boolean && right?.boolean) {
                    if (operator === 'and') {
                        return {
                            type: 'boolean',
                            value: left.value && right.value,
                            boolean: true
                        };
                    } else if (operator === 'or') {
                        return {
                            type: 'boolean',
                            value: left.value || right.value,
                            boolean: true
                        };
                    }

                    return false;
                }

                return false;
            }
        case 'UnaryExpression':
            {
                const argument = evaluateType(node.argument);

                // Number unary expressions
                if (argument?.number) {
                    if (operator === '-') {
                        return {
                            type: argument.type,
                            value: -argument.value
                        };
                    } else if (operator === '+') {
                        return {
                            type: argument.type,
                            value: +argument.value
                        };
                    }

                    return false;
                }

                // Boolean unary expressions
                if (operator === 'not') {
                    return {
                        type: 'boolean',
                        value: !argument.value
                    };
                }

                // Length unary expressions
                if (operator === '#') {
                    if (argument?.string) {
                        return {
                            type: 'integer',
                            value: argument.value.length
                        };
                    } else if (argument?.table) {
                        return {
                            type: 'integer',
                            value: 0 // unknown
                        };
                    }

                    return false;
                }
            }

            return false;
        case 'LogicalExpression':
            {
                const left = evaluateType(node.left),
                    right = evaluateType(node.right);

                if (operator === 'and') {
                    return {
                        type: 'boolean',
                        value: left.value && right.value
                    };
                } else if (operator === 'or') {
                    return {
                        type: 'boolean',
                        value: left.value || right.value
                    };
                }

                return false;
            }
    }

    return false;
}