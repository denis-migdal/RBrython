import Runner, { PyModule } from "./interface";

export default class RBrythonGlobalRunner extends Runner {

    override run(jscode: string) {
        return this.runFunction( this.loadAsFunction(jscode) );
    }

    override loadAsFunction(jscode: string): () => PyModule {
        $B.imported["_"] = {};
        return Function("'use strict';" + jscode) as () => PyModule;
    }
    override runFunction( fct: (runlib: any) => PyModule ) {
        // @ts-ignore
        return fct();
    }

    override registerBuiltins(symbols: PyModule): void {
        for(let name in symbols)
            this.registerBuiltin(name, symbols[name]);
    }
    override registerBuiltin(name: string, value: any): void {
        $B.builtins[name] = $B.jsobj2pyobj(value);
    }
    override registerModule(name: string, symbols: PyModule): void {
        $B.imported[name] = $B.jsobj2pyobj( symbols );
    }
    override getModule(name: string): PyModule {
        return $B.imported[name];
    }
}