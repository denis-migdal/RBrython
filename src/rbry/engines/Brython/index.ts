import { ParsedCode } from "../../ast/types";
import parse from "../../parser";
import Engine, { PyModule } from "../interface";

export default class BrythonEngine extends Engine {

    override registerBuiltins(symbols: string | PyModule): void {
        throw new Error("Method not implemented.");
    }
    
    override registerBuiltin(name: string, value: any): void {
        throw new Error("Method not implemented.");
    }

    override registerModule(name: string, symbols: PyModule): void {
        $B.imported[name] = $B.jsobj2pyobj( symbols );
    }
    override getModule(name: string): PyModule {
        return $B.imported[name];
    }

    constructor() {
        super();
        this.initialize(); // by default initialize immediately.
    }

    run(pycode: string) {
        return this.loadAsFunction(this.emit(this.parse(pycode)))();
    }
    // builtins

    // initialize
    #initialized = false;
    initialize() {
        this.registerModule("JS", globalThis);
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
        return Function("'use strict';" + jscode) as () => PyModule;
    }
}