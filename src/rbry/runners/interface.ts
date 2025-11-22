export type PyModule = Record<string, any>;

export default abstract class Runner {
    
    abstract run(jscode: string): PyModule;

    abstract registerBuiltins(symbols: PyModule): void;
    abstract registerBuiltin(name: string, value: any): void;

    abstract registerModule(name: string, symbols: PyModule): void;
    abstract      getModule(name: string): PyModule;

    // low level
    abstract loadAsFunction(jscode: string): (runlib: any) => PyModule;
    abstract runFunction(fct: (runlib: any) => PyModule): PyModule;
}