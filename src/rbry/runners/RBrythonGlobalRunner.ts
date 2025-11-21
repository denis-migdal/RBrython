import "@RBrython/rbry/runlib";

import Runner, { PyModule } from "./interface";

export const modules: Record<string, any> = {};

export default class RBrythonGlobalRunner extends Runner {

    #module   = modules; // h4ck
    #builtins: Record<string, any> = {};

    override loadAsFunction(jscode: string): () => PyModule {
        return Function("'use strict';" + jscode + "; return __exported__;") as () => PyModule;
    }

    // modules
    override registerModule(name: string, symbols: PyModule): void {
        this.#module[name] = symbols;
    }
    override getModule(name: string): PyModule {
        return this.#module[name];
    } 

    // builtins
    override registerBuiltins(symbols: PyModule): void {
        for(let name in symbols)
            this.registerBuiltin(name, symbols[name]);
    }
    override registerBuiltin(name: string, value: any): void {
        this.#builtins[name] = value;

        // @ts-ignore
        globalThis[name] = value;
    }

    /*
    // helpers
    override registerHelpers(helpers: Record<string, any>) {
        for(let name in helpers)
            this.registerHelper(name, helpers[name]);
    }
    override registerHelper(name: string, value: any) {
        
    }*/
}