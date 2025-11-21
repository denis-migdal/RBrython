import { ParsedCode } from "../ast/types";
import { PyModule } from "../runners/interface";

export default abstract class Engine {
    abstract run(pycode: string): PyModule;

    abstract registerBuiltins(symbols: string|PyModule): void;
    abstract registerBuiltin(name: string, value: any): void;

    abstract registerModule(name: string, symbols: string|PyModule): void;
    abstract      getModule(name: string): PyModule;

    // low level
    abstract parse(pycode: string): ParsedCode;
    abstract emit (parsed: ParsedCode): string;
    abstract loadAsFunction(jscode: string): () => PyModule;
}