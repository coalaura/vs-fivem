// Native Type: Type straight from the cfx natives.json
// Lua Type: Normalized type that is used in the lua code
// Basic Type: Basic types only (integer, number, boolean, string, nil, any, vector3)

export function nativeTypeToLuaType(type) {
    type = type.toLowerCase();

    // Remove pointer
    type.endsWith('*') && (type = type.slice(0, -1));

    switch (type) {
        case 'int':
        case 'long':
            return 'integer';
        case 'char*':
        case 'char':
            return 'string';
        case 'bool':
        case 'boolean':
            return 'boolean';
        case 'func':
            return 'function';
        case 'float':
            return 'number';
        case 'cam':
            return 'camera';
        case 'scrhandle':
            return 'handle';
        case 'fireid':
            return 'fire';
        case 'hash':
        case 'vehicle':
        case 'entity':
        case 'object':
        case 'ped':
        case 'player':
        case 'blip':
        case 'pickup':
        case 'vector3':
            return type;
        case 'any':
            return 'any';
    }

    console.warn(`[nativeTypeToLuaType] Unknown native-type: ${type}`);

    return 'any';
}

export function luaTypeToBasicType(type) {
    type = type.toLowerCase();

    switch (type) {
        case 'integer':
            return 'integer';
        case 'number':
            return 'number';
        case 'boolean':
            return 'boolean';
        case 'string':
            return 'string';
        case 'nil':
            return 'nil';
        case 'any':
            return 'any';
        case 'vector3':
            return 'vector3';
        case 'function':
            return 'function';
        case 'table':
            return 'table';
        case 'hash':
        case 'vehicle':
        case 'entity':
        case 'object':
        case 'ped':
        case 'player':
        case 'blip':
        case 'pickup':
        case 'fire':
        case 'handle':
        case 'camera':
            return 'integer';
    }

    console.warn(`[luaTypeToBasicType] Unknown lua-type: ${type}`);

    return 'any';
}

export function getDefaultValueForBasicType(type) {
    type = type.toLowerCase();

    switch (type) {
        case 'integer':
            return '0';
        case 'number':
            return '0.0';
        case 'boolean':
            return 'false';
        case 'string':
            return '""';
        case 'nil':
            return 'nil';
        case 'any':
            return 'nil';
        case 'vector3':
            return 'vector3(0.0, 0.0, 0.0)';
        case 'function':
            return 'function()end';
    }

    console.warn(`[getDefaultValueForBasicType] Unknown lua-type: ${type}`);

    return 'false';
}

export function convertValueToBasicType(type, value) {
    type = type.toLowerCase();

    if (detectBasicTypeFromValue(value) === type) {
        return value;
    }

    const noString = value.replace(/^["'\s]|["'\s]$/g, '');
    const number = (parseFloat(noString) || 0).toString();

    switch (type) {
        case 'integer':
            return number.split('.').shift();
        case 'number':
            return number.includes('.') ? number : number + '.0';
        case 'boolean':
            return noString === 'true' ? 'true' : (number ? 'true' : 'false');
        case 'string':
            return `"${noString}"`;
        case 'vector3':
            return `vector3(${number}, ${number}, ${number})`;
        case 'nil':
        case 'function':
            return 'nil';
        case 'any':
            return value;
    }

    console.warn(`[convertValueToBasicType] Unknown basic-type: ${type}`);

    return 'false';
}

export function detectBasicTypeFromValue(value) {
    if (value === 'true' || value === 'false') {
        return 'boolean';
    }

    if (value === 'nil') {
        return 'nil';
    }

    if (value.match(/^(['"]).+?\1$/m)) {
        return 'string';
    }

    if (value.match(/^\d+\.\d+$/m)) {
        return 'number';
    }

    if (value.match(/^\d+$/m)) {
        return 'integer';
    }

    if (value.match(/^vec(tor)?3\((\d+(\.\d+)?), ?(\d+(\.\d+)?), ?(\d+(\.\d+)?)\)$/m)) {
        return 'vector3';
    }

    return 'any';
}
