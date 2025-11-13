import { ParsedCode } from "../../ast/types";
import parse from "../../parser";

export default class BrythonRunner {

    constructor() {
        this.initialize(); // by default initialize immediately.
    }

    run(pycode: string) {
        this.asFunction(this.emit(this.parse(pycode)))();
    }
    // builtins

    // initialize
    #initialized = false;
    initialize() {
        this.#initialized = true;
    }

    // low level
    parse(pycode: string): ParsedCode {
        return parse(pycode, "_");
    }
    emit(ast: ParsedCode) {
        let imported:any;
        return $B.js_from_root({ast: ast.ast,
                                symtable: ast.symtable,
                                filename: ast.filename,
                                src     : ast.pycode,
                                imported}).js

    }
    asFunction(jscode: string) {
        return new Function(jscode);
    }
}

/*
 - config: macros, symbols
 - ??Builtin(name, code, cfg)
 - registerBuiltin(name, symb)
 - initialize()
 */