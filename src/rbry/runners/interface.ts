export type PyModule = Record<string, any>;

export default abstract class Runner {
    
    abstract run(jscode: string): Promise<PyModule>;
    abstract runSync(jscode: string): PyModule;

    abstract registerBuiltins(symbols: PyModule): void;
    abstract registerBuiltin(name: string, value: any): void;

    abstract registerModule(name: string, symbols: PyModule): void;
    abstract      getModule(name: string): PyModule;

    // low level
    abstract loadAsFunction(jscode: string): (runlib: any) => Promise<PyModule>;
    abstract runFunction(fct: (runlib: any) => Promise<PyModule>): Promise<PyModule>;

    abstract loadAsSyncFunction(jscode: string): (runlib: any) => PyModule;
    abstract runSyncFunction(fct: (runlib: any) => PyModule): PyModule;
}