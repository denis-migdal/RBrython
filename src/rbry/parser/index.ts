import {AST} from "../ast/types";

export default function parse(code: string, filename: string): AST {

    const parser = new $B.Parser(code, filename, 'file');
    const ast   = $B._PyPegen.run_parser(parser);

    return {
        ast,
        filename
    }
}