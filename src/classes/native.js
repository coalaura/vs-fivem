import vscode from 'vscode';

import { createNativeLuaName, resolveParametersAndReturns } from '../helper/natives.js';
import { applyNativeOverrides } from '../data/overrides.js';

export default class Native {
    constructor(json) {
        this.context = json.apiset || 'shared';
        this.hash = json.hash;
        this.namespace = json.ns;

        this.description = json.description ? json.description.trim().replace(/(?<=]\()#/g, 'https://docs.fivem.net/natives/?') : null;

        this.name = json.name ? createNativeLuaName(json.name) : json.hash;

        const { parameters, returns } = resolveParametersAndReturns(this.name, json);

        this.parameters = parameters;
        this.returns = returns;

        this.aliases = (json.aliases || []).map(alias => createNativeLuaName(alias));

        this.example = json.examples ? json.examples.find(example => {
            return example.lang === 'lua';
        }) : null;

        applyNativeOverrides(this);
    }

    documentation() {
        const blocks = [];

        // Header
        blocks.push(`\`${this.namespace}\` \`${this.context.toUpperCase()}\` [\`${this.hash}\`](https://docs.fivem.net/natives/?_${this.hash})`);

        // Function definition
        const padding = this.returns.length === 0 ? '' : '\t';

        const returnStr = this.returns.map(value => `${value.name} --[[ ${value.type} ]]`).join(', ');
        const parameterStr = this.parameters.map(value => `${padding}\t${value.name} --[[ ${value.type} ]]`).join(',\n');

        blocks.push('```lua\n' + (returnStr ? `local ${returnStr} = \n\t` : '') + this.name + '(' + (parameterStr ? `\n${parameterStr}\n` : '') + padding + ')' + '\n```');

        // Description
        this.description && blocks.push(`**Description:**  \n${this.description}`);

        // Parameters
        const parameters = this.parameters.filter(param => param.description);

        parameters.length && blocks.push('**Parameters:**  \n' + parameters.map(param => {
            return `* \`${param.name}\`: *${param.description}*`;
        }).join('\n'));

        // Returns
        const returns = this.returns.filter(ret => ret.description);

        returns.length && blocks.push('**Returns:**  \n' + returns.map(ret => {
            return `* \`${ret.name}\`: *${ret.description}*`;
        }).join('\n'));

        // Example
        this.example && blocks.push('**Example:**  \n```lua\n' + this.example.code + '\n```');

        return blocks;
    }

    detail() {
        return this.context + ': ' + (this.returns.length === 0 ? 'void' : this.returns.map(ret => ret.type).join(', '));
    }

    complete(context) {
        const item = new vscode.CompletionItem(this.name, vscode.CompletionItemKind.Function);

        item.detail = this.detail();

        if (this.description) {
            item.documentation = this.description;
        }

        item.sortText = (this.context === context ? '' : '~') + this.name;

        const parameters = this.parameters.map(param => param.name).join(', ');

        item.insertText = new vscode.SnippetString(this.name + '(' + parameters + ')');

        return item;
    }
}