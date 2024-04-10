import vscode from 'vscode';

import { getPedConfigFlagName } from './data/ped-config-flags.js';
import { getPedTaskName } from './data/ped-tasks.js';
import { getPedMotionStateName } from './data/ped-motion-states.js';
import { getVehicleModName } from './data/vehicle-mods.js';
import { getVehicleWheelTypeName } from './data/vehicle-wheel-types.js';

import { matchAll } from './helper/regexp.js';
import { showInlineHints } from './helper/config.js';
import HintDecorator from './classes/hint-decorator.js';

const decorator = new HintDecorator();

function updateDecorationsIfNeeded(document) {
    const activeEditor = vscode.window.activeTextEditor;

    if (!activeEditor) return;

    document = document || activeEditor.document;

    if (!document || activeEditor.document !== document) return;

    if (document.languageId !== 'lua' || !showInlineHints()) {
        decorator.clear();

        return;
    }

    decorator.updateDecorations(activeEditor, document);
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
        });
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
        })
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
        })
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
        })
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