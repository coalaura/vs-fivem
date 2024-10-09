import antlr4 from 'antlr4';
import LuaLexer from './antlr/LuaLexer.js';
import LuaParser from './antlr/LuaParser.js';
import LuaErrorListener from './antlr/LuaErrorListener.js';
import FunctionCallVisitor from './antlr/FunctionCallVisitor.js';

export function parse(code) {
    const stream = new antlr4.InputStream(code),
        lexer = new LuaLexer(stream),
        tokens = new antlr4.CommonTokenStream(lexer),
        parser = new LuaParser(tokens);

    parser.removeErrorListeners();

    const error = new LuaErrorListener();

    parser.addErrorListener(error);

    const tree = parser.chunk();

    return {
        tree: tree,
        error: error.syntaxErrors.shift()
    };
}

export function visitFunctions(tree, callback) {
    const visitor = new FunctionCallVisitor(callback);

    visitor.visit(tree);
}