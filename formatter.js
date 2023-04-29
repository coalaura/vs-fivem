const vscode = require('vscode');
const { formatter } = require('@appguru/luafmt');

function indent(code) {
    // This part is just to make sure that comments are not affected by the formatting
    let comments = [],
        singleLineComments = [];

    code = code.replace(/--\[\[.+?]]/gms, (match) => {
        comments.push(match);

        return "-- M_COMMENT";
    });

    code = code.replace(/--(?!\[\[| M_COMMENT).+$/gm, (match) => {
        singleLineComments.push(match);

        return "-- S_COMMENT";
    });

    try {
        code = formatter({
            inline: {
                block: false,
                table: {
                    max_field_count: 30,
                    max_field_length: 6
                }
            }
        })(code);
    } catch (e) {
        return false;
    }

    // Fixes
    code = code.replace(/(?<=\w)"[^"]+?"($|,|])/gm, match => {
        return `(${match})`;
    });

    code = code.replace(/(\d+\.)?\d+e-?\d+/gm, match => {
        const actual = parseFloat(match);

        return actual.toString();
    });

    code = code.replace(/local \w+$/gm, match => {
        return match + ' = nil';
    });

    // Newlines
    code = code.replace(/(?<!((local )?function ?.+?|then|do|else)\s+)(^\t*((?<!else)if|for|return|while|repeat))/gm, match => {
        return '\n' + match;
    });

    code = code.replace(/(?<!\n|local .+|function.+|then|do|repeat|else)\n\t*local/gm, match => {
        return '\n' + match;
    });

    code = code.replace(/\bend\n(?!\t*(end|else|until|\n))/gm, match => {
        return match + '\n';
    });

    code = code.replace(/\n\t*(Citizen\.?)Wait\(\d+\)\n(?!\n|\t*end)/gm, match => {
        return match + '\n';
    });

    code = code.replace(/(?<!\n\t*[\w.:"[\]-]+\(.*\)|(local )?function ?.+?|then|do|else|repeat|\n)\n\t*[\w.:"[\]-]+\(.*\)$/gm, match => {
        return '\n' + match;
    });

    code = code.replace(/(?<!(local )?function ?.+?|\n|then|do|else|repeat)\n\t*(Citizen\.?)Wait\(\d+\)/gm, match => {
        return '\n' + match;
    });

    code = code.replace(/(?<!\n|function.+|then|do|repeat|else|,|\n\t*\w+ = [^\n,]+$)\n\t*\w+ = [^\n,]+$/gm, match => {
        return '\n' + match;
    });

    code = code.replace(/{ +| +}/gm, match => {
        return match.trim();
    });

    code = code.replace(/\n{3,}/gm, '\n\n');

    /* --- Restore comments --- */
    code = code.replace(/-- ?M_COMMENT/gm, () => {
        let comment = comments.shift().trim();

        if (!comment.endsWith('--]]')) {
            comment = comment.replace(/]]$/, '--]]');
        }

        return comment;
    });

    code = code.replace(/-- ?S_COMMENT/gm, () => {
        return singleLineComments.shift();
    });

    return code;
}

function formatDocument() {
    const editor = vscode.window.activeTextEditor,
        document = editor ? editor.document : null;

    if (!document) return;

    if (document.languageId !== 'lua') {
        vscode.window.showWarningMessage('This is not a Lua file.');

        return;
    }

    const text = document.getText();

    vscode.window.withProgress({
		location: vscode.ProgressLocation.Notification,
		title: 'Formatting code...'
	}, async () => {
        const result = indent(text);

        if (!result) {
            vscode.window.showWarningMessage('Failed to format code.');

            return;
        }

        await editor.edit(editBuilder => {
            const start = new vscode.Position(0, 0),
                end = new vscode.Position(document.lineCount - 1, document.lineAt(document.lineCount - 1).text.length);

            editBuilder.replace(new vscode.Range(start, end), result);
        });
    });
}

module.exports = {
    formatDocument
};
