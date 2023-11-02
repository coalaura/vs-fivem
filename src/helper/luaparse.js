import vscode from 'vscode';

import { parse as parseGLM } from '@coalaura/luaparse-glm';
import { parse as parseVanilla } from 'luaparse';

export function isSupportingLuaGLM() {
    const config = vscode.workspace.getConfiguration('vs-fivem');

    return config.get('luaGLM');
}

export function parse(pCode, pOptions = {}) {
    pOptions.luaVersion = '5.3';

    if (isSupportingLuaGLM()) {
        return parseGLM(pCode, pOptions);
    } else {
        return parseVanilla(pCode, pOptions);
    }
}
