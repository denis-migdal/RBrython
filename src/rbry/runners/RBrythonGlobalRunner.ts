import "@RBrython/rbry/runlib";

import Runner, { PyModule } from "./interface";
import { $RB } from "@RBrython/rbry/runlib";

export const modules: Record<string, any> = {};

export default class RBrythonGlobalRunner extends Runner {

    #module   = modules; // h4ck
    #builtins: Record<string, any> = {};

    override async run(jscode: string) {
        return await this.runFunction( this.loadAsFunction(jscode) );
    }
    override runSync(jscode: string) {
        return this.runSyncFunction( this.loadAsSyncFunction(jscode) );
    }

    override loadAsFunction(jscode: string): (runlib: any) => Promise<PyModule> {
        return eval(jscode) as (runlib: any) => Promise<PyModule>;
    }
    override async runFunction( fct: (runlib: any) => Promise<PyModule> ) {
        // @ts-ignore
        $RB.__import_name__ = "__main__";
        return await fct($RB);
    }

    override loadAsSyncFunction(jscode: string): (runlib: any) => PyModule {
        return eval(jscode) as (runlib: any) => PyModule;
    }
    override runSyncFunction( fct: (runlib: any) => PyModule ) {
        // @ts-ignore
        $RB.__import_name__ = "__main__";
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
}