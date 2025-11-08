import {AST, ModuleNode} from "./ast/types";

export function py2ast(code: string, filename: string): AST {

    const parser = new $B.Parser(code, filename, 'file');
    const ast   = $B._PyPegen.run_parser(parser);

    return {
        ast,
        filename
    }
}