import { ParsedCode } from "../ast/types";

export default function parse(pycode: string, filename: string): ParsedCode {
    
    const parser = new $B.Parser(pycode, filename, 'file');

    const ast   = $B._PyPegen.run_parser(parser);
    const future = $B.future_features(ast, filename)
    var symtable = $B._PySymtable_Build(ast, filename, future);

    return {
        filename,
        pycode,
        ast,
        symtable,
    }
}