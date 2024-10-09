import vscode from 'vscode';

import { getPedConfigFlagName } from './data/ped-config-flags.js';
import { getPedTaskName } from './data/ped-tasks.js';
import { getPedMotionStateName } from './data/ped-motion-states.js';
import { getVehicleModName } from './data/vehicle-mods.js';
import { getVehicleWheelTypeName } from './data/vehicle-wheel-types.js';
import { getControlIdName } from './data/controls.js';
import { getNativeNameFromOffset } from './data/native-names.js';
import { getVehicleTaskFlags } from './data/vehicle-task-flags.js';
import { getForceTypeName } from './data/force-types.js';
import { getVehicleNodeFlags } from './data/node-flags.js';
import { getExplosionTypeName } from './data/eplosion-types.js';
import { getScriptGfxDrawOrderName } from './data/draw-orders.js';
import { getTextFontName } from './data/text-fonts.js';

import { matchAll } from './helper/regexp.js';
import { showInlineHints } from './helper/config.js';
import HintDecorator from './classes/hint-decorator.js';

const decorator = new HintDecorator();

let timeout;

function updateDecorationsIfNeeded(document) {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) return;

    document = document || activeEditor.document;

    if (!document || activeEditor.document !== document) return;

    if (document.languageId !== 'lua' || !showInlineHints()) {
        decorator.clear();

        return;
    }

    clearTimeout(timeout);

    timeout = setTimeout(() => {
        decorator.updateDecorations(activeEditor, document);
    }, 300);
}

function registerProviders() {
    // SetPedConfigFlag & GetPedConfigFlag
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=[SG]etPedConfigFlag\s*\([^,]+?,\s*)\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                flag = getPedConfigFlagName(id);

            return {
                hint: flag,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // GetIsTaskActive
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=GetIsTaskActive\s*\([^,]+?,\s*)\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                task = getPedTaskName(id);

            return {
                hint: task,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // ForcePedMotionState
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=ForcePedMotionState\s*\([^,]+?,\s*)-?\d+/g, text);

        return matches.map(match => {
            const hash = parseInt(match[0]),
                state = getPedMotionStateName(hash);

            return {
                hint: state,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // GetVehicleMod & SetVehicleMod & ToggleVehicleMod
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=(?:[GS]et|Toggle)VehicleMod\s*\([^,]+?,\s*)-?\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                mod = getVehicleModName(id);

            return {
                hint: mod,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // SetVehicleWheelType
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=SetVehicleWheelType\s*\([^,]+?,\s*)\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                type = getVehicleWheelTypeName(id);

            return {
                hint: type,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // DisableControlAction & EnableControlAction
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=((Dis|En)ableControlAction|[SG]etControlNormal|Is(Disabled)?Control(Active|(Just)?(Pressed|Released)))\(\d, )\d+/g, text);

        return matches.map(match => {
            const id = parseInt(match[0]),
                control = getControlIdName(id);

            return {
                hint: control,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // Citizen.InvokeNative & N_
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=(InvokeNative|N_)\()0x[a-f0-9]+/gi, text);

        return matches.map(match => {
            const offset = match[0],
                name = getNativeNameFromOffset(offset);

            return {
                hint: name,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // TaskLeaveVehicle & TaskLeaveAnyVehicle & TaskEnterVehicle
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=Task(Leave(Any)?)Vehicle\(([^,]+,\s*){2}|TaskEnterVehicle\(([^,]+,\s*){5})\d+/gi, text);

        return matches.map(match => {
            const flags = parseInt(match[0]),
                names = getVehicleTaskFlags(flags);

            return {
                hint: names.join(" | "),
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // ApplyForceToEntity & ApplyForceToEntityCenterOfMass
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=ApplyForceToEntity(CenterOfMass)?\(([^,]+,\s*))\d+/gi, text);

        return matches.map(match => {
            const type = parseInt(match[0]),
                name = getForceTypeName(type);

            return {
                hint: name,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // Get...VehicleNode...
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=GetClosestVehicleNode(Id)?(WithHeading)?\(([^,]+,\s*){3}|GetNthClosestVehicleNode(Id)?(FavourDirection|WithHeading)?\(([^,]+,\s*){4}|GetNthClosestVehicleNodeFavourDirection\(([^,]+,\s*){7})\d+/gi, text);

        return matches.map(match => {
            const flags = parseInt(match[0]),
                names = getVehicleNodeFlags(flags);

            return {
                hint: names.join(" | "),
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // AddExplosion
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=AddExplosion\(([^,]+,\s*){3})\d+/gi, text);

        return matches.map(match => {
            const type = parseInt(match[0]),
                name = getExplosionTypeName(type);

            return {
                hint: name,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // SetScriptGfxDrawOrder
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=SetScriptGfxDrawOrder\()\d+/gi, text);

        return matches.map(match => {
            const type = parseInt(match[0]),
                name = getScriptGfxDrawOrderName(type);

            return {
                hint: name,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });

    // SetTextFont
    decorator.registerProvider(text => {
        const matches = matchAll(/(?<=SetTextFont\()\d+/gi, text);

        return matches.map(match => {
            const type = parseInt(match[0]),
                name = getTextFontName(type);

            return {
                hint: name,
                index: match.index + match[0].length
            };
        }).filter(match => match.hint);
    });
}

export function registerHintDecorator(context) {
    registerProviders();

    updateDecorationsIfNeeded(false);

    vscode.window.onDidChangeActiveTextEditor(() => {
        updateDecorationsIfNeeded(false);
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        updateDecorationsIfNeeded(event.document);
    }, null, context.subscriptions);
}