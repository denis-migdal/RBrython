import {AST} from "../ast/types";

const lit_code =  require("!!raw-loader!../corelib/int.py").default
                + require("!!raw-loader!../corelib/float.py").default
                + require("!!raw-loader!../corelib/bool.py").default
                + require("!!raw-loader!../corelib/str.py").default

export default function parse(code: string, filename: string): AST {

    code = lit_code + "\n" + code;

    const parser = new $B.Parser(code, filename, 'file');
    const ast   = $B._PyPegen.run_parser(parser);

    return {
        ast,
        filename
    }
}