const parser = require("luaparse");
const vscode = require('vscode');

function _supportLuaGLM() {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get('luaGLM');
}

// Wrapper around luaparse that makes the code 5.4 compatible
function prepareCode(pCode) {
    if (!_supportLuaGLM()) return pCode;

    // +=, -=, *=, /=, <<=, >>=, &=, |=, and ^=
    pCode = pCode.replace(/([\w.]+) ([+\-*/&|^]|<<|>>)=/gi, "$1 = $1 $2");

    // Safe Navigation: t?.x?.y == nil
    pCode = pCode.replace(/(?<=\w)\?(?=\.\w)/gi, "");

    // Unpacking named values from tables using in: local a,b,c in t
    pCode = pCode.replace(/ in (.+?)(?=$|;)/gi, " = table.unpack($1)");

    return pCode;
}

function parse(pCode, pOptions = {}) {
    pCode = prepareCode(pCode);

    pOptions.luaVersion = "5.3";

    return parser.parse(pCode, pOptions);
}

function fixColumnOffset(pCode, pLine, pColumn) {
    if (!_supportLuaGLM()) return pColumn;

    const lines = pCode.split(/\r?\n/);

    if (lines.length >= pLine) return false;

    const line = lines[pLine - 1];

    return fixColumnOffsetLine(line, pColumn);
}

function fixColumnOffsetLine(pLine, pColumn) {
    if (!_supportLuaGLM()) return pColumn;

    let offset = 0,
        line = "";

    for (let i = 0; i < pLine.length && i + offset <= pColumn; i++) {
        const char = pLine[i];

        line += char;

        const fixed = prepareCode(line);

        if (fixed !== line) {
            offset += fixed.length - line.length;

            if (fixed.includes("table.unpack")) offset -= 1;

            line = fixed;
        }
    }

    return pColumn - offset;
}

function fixColumnOffsetLineReverse(pLine, pColumn) {
    if (!_supportLuaGLM()) return pColumn;

    let offset = 0,
        line = "";

    for (let i = 0; i < pLine.length && i + offset <= pColumn; i++) {
        const char = pLine[i];

        line += char;

        const fixed = prepareCode(line);

        if (fixed !== line) {
            offset -= fixed.length - line.length;

            if (fixed.includes("table.unpack")) offset += 1;

            line = fixed;
        }
    }

    return pColumn - offset;
}

module.exports = {
    parse,
    prepareCode,
    fixColumnOffset,
    fixColumnOffsetLine,
    fixColumnOffsetLineReverse
};