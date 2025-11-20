export type PyModule = Record<string, any>;

export default abstract class Runner {
    
    abstract registerBuiltins(symbols: PyModule): void;
    abstract registerBuiltin(name: string, value: any): void;

    abstract registerModule(name: string, symbols: PyModule): void;
    abstract      getModule(name: string): PyModule;

    // low level
    abstract loadAsFunction(jscode: string): () => PyModule;
}