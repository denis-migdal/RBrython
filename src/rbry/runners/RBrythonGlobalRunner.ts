import "@RBrython/rbry/runlib";

import Runner, { PyModule } from "./interface";
import { $RB } from "@RBrython/rbry/runlib";

export const modules: Record<string, any> = {};

export default class RBrythonGlobalRunner extends Runner {

    #module   = modules; // h4ck
    #builtins: Record<string, any> = {};

    override run(jscode: string) {
        return this.runFunction( this.loadAsFunction(jscode) );
    }

    override loadAsFunction(jscode: string): (runlib: any) => PyModule {
        return Function("$RB", jscode) as (runlib: any) => PyModule;
    }
    override runFunction( fct: (runlib: any) => PyModule ) {
        return fct($RB);
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