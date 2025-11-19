import { ParsedCode } from "../../ast/types";
import parse from "../../parser";
import Engine from "../interface";

export default class BrythonEngine extends Engine {

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
        $B.imported["JS"] = $B.jsobj2pyobj( globalThis );

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
        return Function("'use strict';" + jscode) as () => void;
    }
}