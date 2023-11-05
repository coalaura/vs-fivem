import { parse as parseGLM } from '@coalaura/luaparse-glm';
import { parse as parseVanilla } from 'luaparse';

import { isLuaGLM } from './config';

export function parse(pCode, pOptions = {}) {
    pOptions.luaVersion = '5.3';

    if (isLuaGLM()) {
        return parseGLM(pCode, pOptions);
    } else {
        return parseVanilla(pCode, pOptions);
    }
}
