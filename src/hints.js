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
    }, 500);
}

function registerProviders() {
    // SetPedConfigFlag & GetPedConfigFlag
    decorator.registerProvider({
        'SetPedConfigFlag': 1,
        'GetPedConfigFlag': 1
    }, (func, arg) => {
        const id = parseInt(arg.value);

        return getPedConfigFlagName(id);
    });

    // GetIsTaskActive
    decorator.registerProvider({
        'GetIsTaskActive': 1
    }, (func, arg) => {
        const id = parseInt(arg.value);

        return getPedTaskName(id);
    });

    // ForcePedMotionState
    decorator.registerProvider({
        'ForcePedMotionState': 1
    }, (func, arg) => {
        const hash = parseInt(arg.value);

        return getPedMotionStateName(hash);
    });

    // GetVehicleMod & SetVehicleMod & ToggleVehicleMod
    decorator.registerProvider({
        'GetVehicleMod': 1,
        'SetVehicleMod': 1,
        'ToggleVehicleMod': 1
    }, (func, arg) => {
        const id = parseInt(arg.value);

        return getVehicleModName(id);
    });

    // SetVehicleWheelType
    decorator.registerProvider({
        'SetVehicleWheelType': 1
    }, (func, arg) => {
        const id = parseInt(arg.value);

        return getVehicleWheelTypeName(id);
    });

    // DisableControlAction & EnableControlAction
    decorator.registerProvider({
        'DisableControlAction': 1,
        'EnableControlAction': 1
    }, (func, arg) => {
        const id = parseInt(arg.value);

        return getControlIdName(id);
    });

    // Citizen.InvokeNative
    decorator.registerProvider({
        'Citizen.InvokeNative': 0
    }, (func, arg) => {
        const offset = arg.value;

        return getNativeNameFromOffset(offset);
    });

    // TaskLeaveVehicle & TaskLeaveAnyVehicle & TaskEnterVehicle
    decorator.registerProvider({
        'TaskLeaveVehicle': 2,
        'TaskLeaveAnyVehicle': 2,
        'TaskEnterVehicle': 5
    }, (func, arg) => {
        const flags = parseInt(arg.value);

        return getVehicleTaskFlags(flags);
    });

    // ApplyForceToEntity & ApplyForceToEntityCenterOfMass
    decorator.registerProvider({
        'ApplyForceToEntity': 1,
        'ApplyForceToEntityCenterOfMass': 1
    }, (func, arg) => {
        const type = parseInt(arg.value);

        return getForceTypeName(type);
    });

    // Get...VehicleNode...
    decorator.registerProvider({
        'GetClosestVehicleNode': 3,
        'GetClosestVehicleNodeWithHeading': 3,
        'GetNthClosestVehicleNode': 3,
        'GetNthClosestVehicleNodeFavourDirection': 7,
        'GetNthClosestVehicleNodeId': 4,
        'GetNthClosestVehicleNodeIdWithHeading': 4,
        'GetNthClosestVehicleNodeWithHeading': 4
    }, (func, arg) => {
        const flags = parseInt(arg.value);

        return getVehicleNodeFlags(flags);
    });

    // AddExplosion
    decorator.registerProvider({
        'AddExplosion': 3
    }, (func, arg) => {
        const type = parseInt(arg.value);

        return getExplosionTypeName(type);
    });

    // SetScriptGfxDrawOrder
    decorator.registerProvider({
        'SetScriptGfxDrawOrder': 0
    }, (func, arg) => {
        const type = parseInt(arg.value);

        return getScriptGfxDrawOrderName(type);
    });

    // SetTextFont
    decorator.registerProvider({
        'SetTextFont': 0
    }, (func, arg) => {
        const type = parseInt(arg.value);

        return getTextFontName(type);
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