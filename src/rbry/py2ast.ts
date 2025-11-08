import {Module} from "./bry_types"

export type AST = {
    filename: string,
    ast     : Module
}

export function py2ast(code: string, filename: string): AST {

    const parser = new $B.Parser(code, filename, 'file');
    const ast   = $B._PyPegen.run_parser(parser);

    return {
        ast,
        filename
    }
}