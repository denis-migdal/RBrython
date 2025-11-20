import { PyModule } from "@RBrython/rbry/runners/interface";
import { ParsedCode } from "../../ast/types";
import parse from "../../parser";
import Engine from "../interface";
import BrythonGlobalRunner from "@RBrython/rbry/runners/BrythonGlobalRunner";

export default class BrythonEngine extends Engine {

    readonly runner = new BrythonGlobalRunner();

    override registerBuiltins(symbols: string | PyModule): void {
        if( typeof symbols === "string")
            throw new Error("Not implemented (yet)");
        this.runner.registerBuiltins(symbols);
    }
    
    override registerBuiltin(name: string, value: any): void {
        this.runner.registerBuiltin(name, value);
    }

    override registerModule(name: string, symbols: PyModule): void {
        this.runner.registerModule(name, symbols);
    }
    override getModule(name: string): PyModule {
        return this.runner.getModule(name);
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
        return this.runner.loadAsFunction(jscode);
    }
}