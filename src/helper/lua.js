import vscode from 'vscode';

import { parse } from './luaparse.js';

const NestedKeys = [
    'base',
    'parameters',
    'arguments',
    'clauses',
    'condition',
    'left',
    'right',
    'iterators',
    'variables',
    'expression',
    'start',
    'end',
    'fields',
    'value',
    'key',
    'init',
    'argument',
    'index',
    'body'
];

export function extractAllFunctionCalls(ast, code, whitelist = false) {
    if (!ast) return [];

    if (typeof ast === "string") {
        code = ast;

        try {
            ast = parse(code, {
                locations: true,
                ranges: true,
            });
        } catch (e) {
            return [];
        }
    }

    // Fail somewhat quietly
    try {
        const index = _index(code);

        return _walk(ast, code, whitelist, (line, column) => {
            return index[line - 1] + column;
        }, []);
    } catch (e) {
        console.error(e);
    }

    return [];
}

function _walk(ast, code, whitelist, index, functions = []) {
    if (!ast) return functions;

    for (const key in ast) {
        if (!NestedKeys.includes(key)) continue;

        const value = ast[key],
            chunk = Array.isArray(value) ? value : [value];

        for (const item of chunk) {
            _walk(item, code, whitelist, index, functions);
        }
    }

    if (ast.type === "CallExpression") {
        const name = _identifierName(ast);

        if (whitelist && !whitelist.includes(name)) return functions;

        const args = _resolveArguments(code, ast.arguments || [], index);

        const codeStart = index(ast.base.loc.start.line, ast.base.loc.start.column),
            codeEnd = index(ast.loc.end.line, ast.loc.end.column),
            codeRaw = code.slice(codeStart, codeEnd);

        const rawArgs = args.length > 0 ? code.slice(args[0].start, args[args.length - 1].end) : "";

        functions.push({
            raw: codeRaw,
            rawArguments: rawArgs,

            name: name,
            arguments: args,

            position: {
                line: ast.base.loc.start.line,
                character: ast.base.loc.start.column
            },
            range: _range(codeStart, codeEnd)
        });
    }

    return functions;
}

function _resolveArguments(code, args, index) {
    return args.map(arg => {
        const codeStart = index(arg.loc.start.line, arg.loc.start.column),
            codeEnd = index(arg.loc.end.line, arg.loc.end.column),
            raw = code.slice(codeStart, codeEnd);

        return {
            value: raw,

            start: codeStart,
            end: codeEnd,

            range: _range(codeStart, codeEnd)
        };
    });
}

function _identifierName(pIdentifier) {
    if (pIdentifier) {
        let base, identifier, index, left, right

        switch (pIdentifier.type) {
            case "MemberExpression":
                base = _identifierName(pIdentifier.base);
                identifier = _identifierName(pIdentifier.identifier);

                return (base ? base : "unknown") + pIdentifier.indexer + (identifier ? identifier : "unknown");
            case "IndexExpression":
                base = _identifierName(pIdentifier.base);
                index = _identifierName(pIdentifier.index);

                return (base ? base : "unknown") + "[" + (index ? index : "unknown") + "]";
            case "Identifier":
                return pIdentifier.name;
            case "CallExpression":
                return _identifierName(pIdentifier.base);
            case "BinaryExpression":
                left = _identifierName(pIdentifier.left) || "unknown";
                right = _identifierName(pIdentifier.right) || "unknown";

                return `${left} ${pIdentifier.operator} ${right}`;
        }

        if (pIdentifier.raw) {
            return pIdentifier.raw;
        }
    }

    console.log("Unknown identifier", pIdentifier);

    return null;
}

function _index(code) {
    const result = [];

    const lines = code.split(/\n/g);

    let characters = 0;

    for (const line of lines) {
        result.push(characters);

        characters += line.length + 1;
    }

    return result;
}

function _range(start, end) {
    return document => {
        return new vscode.Range(
            document.positionAt(start),
            document.positionAt(end)
        );
    };
}