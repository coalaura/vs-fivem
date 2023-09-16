const luaparse = require('luaparse');

function parseList(code) {
    code = "local list = {" + code + "}";

    let ast = false;

    try {
        ast = luaparse.parse(code, {
            comments: false,
            luaVersion: '5.3'
        });
    } catch (e) {
        return false;
    }

    const statement = ast.body[0];

    if (statement.type !== 'LocalStatement') return false;

    const init = statement.init[0];

    if (init.type !== 'TableConstructorExpression') return false;

    const fields = init.fields;

    let result = [];

    for (const field of fields) {
        if (field.type !== 'TableValue') return false;

        const value = field.value;

        if (!['StringLiteral', 'NumericLiteral'].includes(value.type)) return false;

        const raw = value.type === 'StringLiteral' ? value.raw.slice(1, -1) : value.value.toString();

        result.push({
            quoted: value.type === 'StringLiteral',
            value: raw
        });
    }

    return result.sort((a, b) => a.value.localeCompare(b.value));
}

function formatList(items, eol) {
    let result = [];
    let line = "";

    for (const item of items) {
        const value = item.quoted ? '"' + item.value + '"' : item.value;

        const length = (line + value).length;

        if (length > 100) {
            result.push(line.trim());

            line = '';
        } else {
            line += ' ';
        }

        line += value + ',';
    }

    if (line) {
        result.push(line.trim());
    }

    return result.join(eol).slice(0, -1);
}

module.exports = {
    parseList,
    formatList
};
