import antlr4 from 'antlr4';

import LuaParserVisitor from './LuaParserVisitor.js';

export default class FunctionCallVisitor extends LuaParserVisitor {
    constructor(callback) {
        super();

        this.callback = callback;
    }

    visitFunctioncall(ctx) {
        const names = ctx.NAME();

        if (names.length) {
            const name = names.map(name => name.getText()).join('.');

            if (name) {
                const first = names[0],
                    last = names[names.length - 1];

                const args = () => this.getArguments(ctx.args ? ctx.args() : null);

                this.callback(name, args, {
                    start: first.symbol.start,
                    end: last.symbol.stop + 1
                });
            }
        }

        return super.visitFunctioncall(ctx);
    }

    getArguments(argsCtx) {
        if (!argsCtx) return [];

        if (argsCtx.explist()) {
            return argsCtx.explist().exp().map(exp => exp.getText());
        } else if (argsCtx.tableconstructor()) {
            return [argsCtx.tableconstructor().getText()];
        } else if (argsCtx.String()) {
            return [argsCtx.String().getText()];
        }

        return [];
    }
}