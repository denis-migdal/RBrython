import { ParsedCode } from "../../ast/types";
import emit from "../../emitter";
import parse from "../../parser";
import Engine, { PyModule } from "../interface";

import "./macros";
import builtins from "./builtins";

export const modules: Record<string, any> = {};

export default class RBrythonEngine extends Engine {

    #module   = modules; // h4ck
    #builtins: Record<string, any> = {};

    override registerBuiltins(symbols: string | PyModule): void {
        if( typeof symbols === "string")
            symbols = this.run(symbols);
        for(let name in symbols)
            this.registerBuiltin(name, symbols[name]);
    }

    override registerBuiltin(name: string, value: any) {
        this.#builtins[name] = value;

        //TODO...
        // @ts-ignore
        globalThis[name] = value;
    }

    override registerModule(name: string, symbols: string|PyModule): void {
        if( typeof symbols === "string")
            symbols = this.run(symbols);
        this.#module[name] = symbols;
    }
    override getModule(name: string): PyModule {
        return this.#module[name];
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

        return Function("'use strict';" + jscode + "; return __exported__;") as () => PyModule;
    }
}