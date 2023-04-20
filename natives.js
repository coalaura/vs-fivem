const vscode = require('vscode');

const underscoreParts = [
	'3d',
	'2d',
	'2'
];

// Converts the native type to a Lua-friendly type
function createLuaType(type) {
	switch (type) {
		case 'Vector4':
		case 'Vector3':
		case 'Vector2':
			return type.toLowerCase();
		case 'float':
			return 'number';
		case 'int':
			return 'integer';
		case 'BOOL':
			return 'boolean';
		case 'char':
		case 'char*':
			return 'string';
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
function createNativeDocumentation(native) {
	let lines = [
		`Namespace: **${native.ns}** - API set: **${native.apiset}**`,
		`[${native.hash}](https://docs.fivem.net/natives/?_${native.hash})`
	];

	const params = native.params.length > 0 ? '\n' + formatParameters(native.params, false, '    ', ',\n') + '\n' : '';

	const returns = native.returns.length > 0 ? formatReturns(native.returns) : '';

	const documentation = [
		`${returns}${native.name}(${params})`
	];

	if (native.original) {
		documentation.unshift(`-- ${native.original}`);
	}

	lines.push('```lua\n' + documentation.join('\n') + '\n```');

	lines.push(native.description);

	return lines;
}

// Cleans up the servers json
function createNativeObject(data) {
	const apiset = data.apiset || 'client';

	const returns = data.params.filter(param => {
		return param.type.endsWith('*') && param.type !== 'char*';
	}).map(param => {
		return {
			name: param.name,
			type: createLuaType(param.type.replace('*', ''))
		};
	});

	if (data.results) {
		returns.unshift({
			name: 'retval',
			type: createLuaType(data.results)
		});
	}

	const params = data.params.filter(param => {
		return !param.type.endsWith('*') || param.type === 'char*';
	}).map(param => {
		return {
			name: param.name,
			type: createLuaType(param.type.replace('*', ''))
		};
	});

	const detail = apiset + ': ' + (returns.length === 0 ? 'void' : returns.map(ret => ret.type).join(', '));

	const aliases = (data.aliases || []).map(name => {
		return createNativeLuaName(name);
	});

	return {
		hash: data.hash,
		original: data.name,
		name: data.name ? createNativeLuaName(data.name) : data.hash,
		params: params,
		returns: returns,
		detail: detail,
		description: data.description,
		ns: data.ns,
		apiset: apiset,
		aliases: aliases
	};
}

// Gets the context of the current position (client or server)
function getFileContext(filename) {
	if (filename.includes('server') || filename.includes('sv_')) {
		return 'server';
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

	if (linePrefix.endsWith(',') || linePrefix.endsWith('(') || linePrefix.endsWith('=')) {
		return {
			inline: true,
			name: functionName,
			ctx: context
		};
	}

	previousLine = previousLine.trim();

	if (previousLine.endsWith(',')) {
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
	createNativeDocumentation
}
