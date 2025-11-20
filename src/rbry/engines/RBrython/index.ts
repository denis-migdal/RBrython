import { ParsedCode } from "../../ast/types";
import emit from "../../emitter";
import parse from "../../parser";
import Engine from "../interface";

import "./macros";
import builtins from "./builtins";
import { PyModule } from "@RBrython/rbry/runners/interface";
import RBrythonGlobalRunner from "@RBrython/rbry/runners/RBrythonGlobalRunner";

export default class RBrythonEngine extends Engine {

    readonly runner = new RBrythonGlobalRunner();

    override registerBuiltins(symbols: string | PyModule): void {
        if( typeof symbols === "string")
            symbols = this.run(symbols);
        this.runner.registerBuiltins(symbols);
    }

    override registerBuiltin(name: string, value: any) {
        this.runner.registerBuiltin(name, value);
    }

    override registerModule(name: string, symbols: string|PyModule): void {
        if( typeof symbols === "string")
            symbols = this.run(symbols);
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

        for(let name in builtins) {
            // @ts-ignore
            //console.warn(this.emit(this.parse(builtins[name])))
            this.registerBuiltins(builtins[name as keyof typeof builtins]);
        }

        this.#initialized = true;
    }

    // low level
    parse(pycode: string): ParsedCode {
        return parse(pycode, "_");
    }
    emit(ast: ParsedCode) {
        return emit(ast);
    }
    loadAsFunction(jscode: string) {
        return this.runner.loadAsFunction(jscode);
    }
}