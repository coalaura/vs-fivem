const vscode = require('vscode'),
	path = require('path');

const { nativeOverrides } = require('./overrides.js');

const underscoreParts = [
	'3d',
	'2d',
	'2'
];

// Converts the native type to a Lua-friendly type
function createLuaType(type) {
	switch (type.toLowerCase()) {
		case 'vector4':
		case 'vector3':
		case 'vector2':
			return type.toLowerCase();
		case 'float':
			return 'number';
		case 'int':
			return 'integer';
		case 'bool':
			return 'boolean';
		case 'char':
		case 'char*':
			return 'string';
		case 'any':
			return 'any';
	}

	return type;
}

// Converts the native name to a Lua-friendly name
function createNativeLuaName(name) {
	name = name.replace(/^_+|_+$/g, '');

	const parts = name.split('_');

	return parts.map(part => {
		part = part.toLowerCase();

		if (underscoreParts.includes(part)) {
			return '_' + part;
		}

		return part.charAt(0).toUpperCase() + part.slice(1);
	}).join('');
}

// Generates the hover documentation for a native
function createNativeDocumentation(native, isSearch) {
	// Header
	let lines = [
		`\`${native.ns}\` \`${native.apiset.toUpperCase()}\` [\`${native.hash}\`](https://docs.fivem.net/natives/?_${native.hash})`
	];

	// Function definition
	const params = native.params.length > 0 ? '\n' + formatParameters(native.params, false, '    ', ',\n') + '\n' : '';

	const returns = native.returns.length > 0 ? formatReturns(native.returns) : '';

	const documentation = [
		`${returns}${native.name}(${params})`
	];

	if (native.original) {
		documentation.unshift(`-- ${native.original}`);
	}

	lines.push('```lua\n' + documentation.join('\n') + '\n```');

	// Parameters
	const paramList = native.params.filter(param => param.description).map(param => {
		const desc = param.description.substring(0, 1).toUpperCase() + param.description.substring(1);

		return `${isSearch ? '- ' : ''}**\`${param.name}\`**: *${desc}*  `;
	});

	if (paramList.length > 0) {
		lines.push(`**Parameters:**  \n${paramList.join('\n')}`);
	}

	// Returns
	if (native.returnDescription) {
		lines.push(`**Returns:**  \n${isSearch ? '- ' : ''}*${native.returnDescription}*`);
	}

	// Description
	lines.push('**Description:**  \n' + native.description.replace(/(?<=\()#\\_(?=0x)/g, 'https://docs.fivem.net/natives/?_'));

	// Examples
	const example = native.example;

	if (example) {
		lines.push('**Example:**\n```lua\n' + example + '\n```');
	}

	return lines;
}

// Cleans up the servers json
function createNativeObject(data) {
	const apiset = data.apiset || 'client',
		name = data.name ? createNativeLuaName(data.name) : data.hash;

	const invertReturnsAndParams = name.startsWith('Delete') || name.startsWith('Remove') || name.endsWith('AsNoLongerNeeded') || ['DoesRopeExist', 'ClearSequenceTask'].includes(name);

	const returns = data.params.filter(param => {
		return param.type.endsWith('*') && param.type !== 'char*';
	}).map(param => {
		return {
			name: param.name,
			type: createLuaType(param.type.replace('*', ''))
		};
	});

	const params = data.params.filter(param => {
		return !param.type.endsWith('*') || param.type === 'char*';
	}).map(param => {
		return {
			name: param.name,
			type: createLuaType(param.type.replace('*', '')),
			description: param.description
		};
	});

	if (invertReturnsAndParams) {
		while (returns.length > 0) {
			const ret = returns.pop();

			params.unshift(ret);
		}
	}

	if (data.results && data.results !== 'void') {
		returns.unshift({
			name: 'retval',
			type: createLuaType(data.results)
		});
	}

	const detail = apiset + ': ' + (returns.length === 0 ? 'void' : returns.map(ret => ret.type).join(', '));

	const aliases = (data.aliases || []).map(name => {
		return createNativeLuaName(name);
	});

	const example = data.examples ? data.examples.find(example => {
		return example.lang === 'lua';
	}) : null;

	return nativeOverrides({
		hash: data.hash,
		original: data.name,
		name: name,
		params: params,
		returns: returns,
		returnDescription: data.resultsDescription,
		detail: detail,
		description: data.description,
		example: example ? example.code : null,
		ns: data.ns,
		apiset: apiset,
		aliases: aliases
	});
}

// Gets the context of the current position (client or server)
function getFileContext(filename) {
	filename = path.basename(filename);

	if (filename.match(/_sv|sv_|(?<!ob)server/gi)) {
		return 'server';
	}

	if (filename.match(/shared/gi)) {
		return 'shared';
	}

	return 'client';
}

// Formats the parameters
function formatParameters(params, plain, indent, join) {
	indent = indent || '';

	const config = vscode.workspace.getConfiguration('vs-fivem');

	return params.map(param => {
		let name = param.name;

		if (config.get('useParameterFormat')) {
			name = 'p' + name.charAt(0).toUpperCase() + name.slice(1);
		}

		return indent + name + (plain ? '' : ' --[[ ' + param.type + ' ]]');
	}).join(join || ', ');
}

// Formats the return values
function formatReturns(returns, plain) {
	if (returns.length === 0) {
		return '';
	}

	return 'local ' + returns.map(ret => {
		return (plain ? '' : '--[[ ' + ret.type + ' ]] ') + ret.name;
	}).join(', ') + ' = ';
}

function getPositionContext(document, position) {
	let previousLine = position.line > 0 ? document.lineAt(position.line - 1).text : '',
		line = document.lineAt(position.line).text;

	let linePrefix = line.substring(0, position.character),
		lineSuffix = line.substring(position.character);

	const prefixMatch = linePrefix.match(/(\w+)$/),
		suffixMatch = lineSuffix.match(/^(\w+)/);

	const prefix = prefixMatch ? prefixMatch[0] : '',
		suffix = suffixMatch ? suffixMatch[0] : '';

	const functionName = prefix + suffix,
		context = getFileContext(document.fileName);

	linePrefix = linePrefix.substring(0, linePrefix.length - prefix.length).trim();

	if (linePrefix.match(/(,|or|and|if|while|not|\(|=|{)$/gm)) {
		return {
			inline: true,
			name: functionName,
			ctx: context
		};
	}

	previousLine = previousLine.trim();

	if (previousLine.match(/(,|\(|\{)$/gm)) {
		return {
			inline: true,
			name: functionName,
			ctx: context
		};
	}

	return {
		inline: false,
		name: functionName,
		ctx: context
	};
}

module.exports = {
	createNativeObject,
	formatParameters,
	formatReturns,
	getPositionContext,
	createNativeDocumentation,
	getFileContext
}