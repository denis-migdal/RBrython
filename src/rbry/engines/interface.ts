import { ParsedCode } from "../ast/types";
import { EmitterOptions } from "../emitter";
import { Macro } from "../emitter/handlers/operators/Call";
import { PyModule } from "../runners/interface";

export default abstract class Engine {
    abstract run(pycode: string, opts?: EmitterOptions): PyModule;

    abstract registerModule(name: string, symbols: string|PyModule): void;
    abstract      getModule(name: string): PyModule;

    abstract registerBuiltins(symbols: string|PyModule): void;
    abstract registerBuiltin(name: string, value: any): void;
    
    abstract registerMacros(macros: Record<string, Macro>):void;
    abstract registerMacro(name: string, fct: Macro): void;

    // low level
    abstract parse(pycode: string): ParsedCode;
    abstract emit (parsed: ParsedCode, opts?: Partial<EmitterOptions>): string;
    
    abstract loadAsFunction(jscode: string): (runlib: any) => PyModule;
    abstract runFunction(fct: (runlib: any) => PyModule): PyModule;
}