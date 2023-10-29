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

function shiftNonGLMIndex(pCode, pIndex) {
    if (!_supportLuaGLM()) return pIndex;

    const before = pCode.substring(0, pIndex + 1),
        fixed = prepareCode(before);

    return pIndex + (before.length - fixed.length);
}

module.exports = {
    parse,
    prepareCode,
    shiftNonGLMIndex
};