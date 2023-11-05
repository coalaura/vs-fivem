import { basename } from 'path';

import { nativeTypeToLuaType } from '../helper/types.js';

const underscore = ['3d', '2d', '2'];

// Gets the context of the current position (client or server)
export function getFileContext(filename) {
    filename = basename(filename);

    if (filename.match(/_sv|sv_|(?<!ob)server/gi)) {
        return 'server';
    }

    if (filename.match(/shared/gi)) {
        return 'shared';
    }

    return 'client';
}

// Converts the native name to a Lua-friendly name
export function createNativeLuaName(name) {
    if (name.startsWith('0x') || name.startsWith('N_')) return name;

    name = name.replace(/^_+|_+$/g, '');

    const parts = name.split('_');

    return parts.map(part => {
        part = part.toLowerCase();

        if (underscore.includes(part)) {
            return '_' + part;
        }

        return part.charAt(0).toUpperCase() + part.slice(1);
    }).join('');
}

export function resolveParametersAndReturns(name, json) {
    let parameters = (json.params || []).map(param => {
        return {
            name: param.name,
            type: nativeTypeToLuaType(param.type),
            description: param.description
        };
    });

    let returns = json.results && json.results !== 'void' ? [{
        name: 'retval',
        type: nativeTypeToLuaType(json.results),
        description: json.returnDescription
    }] : [];

    // Are return values being passed by reference?
    const passByReference = name.startsWith('Delete') || name.startsWith('Remove') || name.endsWith('AsNoLongerNeeded') || ['DoesRopeExist', 'ClearSequenceTask'].includes(name);

    if (passByReference) {
        returns.push(...parameters);

        parameters = [];
    }

    return { parameters, returns };
}