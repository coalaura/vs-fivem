const parser = require("luaparse");
const vscode = require('vscode');

function _supportLuaGLM() {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get('luaGLM');
}

// Wrapper around luaparse that makes the code lua-glm compatible
function prepareCode(pCode) {
    if (!_supportLuaGLM()) return pCode;

    // +=, -=, *=, /=, <<=, >>=, &=, |=, and ^=
    pCode = pCode.replace(/([\w.]+) ([+\-*/&|^]|<<|>>)=/gi, "$1 = $1 $2");

    // Safe Navigation: t?.x?.y == nil
    pCode = pCode.replace(/(?<=[\w\]])\?(?=\.\w|\[)/gi, "");

    // Unpacking named values from tables using in: local a,b,c in t
    pCode = pCode.replace(/(?<=,\s*[\w.]+) in (.+?)\s*(?=$|;)/gmi, (match, unpack, index) => {
        // Check if before match is a for loop
        if (unpack.includes("do")) {
            const before = pCode.substring(0, index);

            if (before.match(/for\s+[\w.]+(\s*,\s*[\w.]+)*$/m)) return match;
        }

        // Check if unpack is a string
        const last = unpack.slice(-1);
        if (last === '"' || last === "'" || last === ',') return match;

        return ` = table.unpack(${unpack})`;
    });

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