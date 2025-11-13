import { ParsedCode } from "../../ast/types";
import parse from "../../parser";
import Runner from "../interface";

export default class BrythonRunner extends Runner {

    constructor() {
        super();
        this.initialize(); // by default initialize immediately.
    }

    run(pycode: string) {
        this.loadAsFunction(this.emit(this.parse(pycode)))();
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
    loadAsFunction(jscode: string) {
        $B.imported["_"] = {};
        return new Function(jscode) as () => void;
    }
}

/*
 - config: macros, symbols
 - ??Builtin(name, code, cfg)
 - registerBuiltin(name, symb)
 - initialize()
 */