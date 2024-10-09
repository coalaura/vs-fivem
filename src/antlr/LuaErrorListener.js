import antlr4 from 'antlr4';

export default class LuaErrorListener extends antlr4.error.ErrorListener {
    constructor() {
        super();

        this.syntaxErrors = [];
    }

    syntaxError(recognizer, offendingSymbol, line, column, msg, e) {
        this.syntaxErrors.push({
            line,
            column,
            message: msg,
            offendingSymbol,
        });
    }
}
