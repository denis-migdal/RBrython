import Engine from "../interface";
import { ParsedCode } from "@RBrython/rbry/ast/types";
import Runner, { PyModule } from "@RBrython/rbry/runners/interface";
import parse from "@RBrython/rbry/parser";
import {Emitter, EmitterOptions} from "@RBrython/rbry/emitter";
import { FunctionTarget } from "@RBrython/rbry/targets/function";
import { Macro } from "@RBrython/rbry/emitter/EmitContext";

type Parser  = typeof parse;

export default class BaseEngine extends Engine {

    protected readonly parser;
    protected readonly emitter;
    protected readonly runner;

    constructor(parser: Parser, emitter: Emitter, runner: Runner) {
        super();

        this.parser  = parser;
        this.emitter = emitter;
        this.runner  = runner;
    }

    override run(pycode: string, opts?: Omit<EmitterOptions, "target">): PyModule {

        return this.runner.run(this.emit(this.parse(pycode), {
            ...opts,
            target: FunctionTarget
        }));
    }

    // modules
    override registerModule(name: string, symbols: string | PyModule): void {
        if( typeof symbols === "string")
            symbols = this.run(symbols);
        this.runner.registerModule(name, symbols);
    }
    override getModule(name: string): PyModule {
        return this.runner.getModule(name);
    }

    // builtins
    override registerBuiltins(symbols: string | PyModule): void {
        if( typeof symbols === "string")
            symbols = this.run(symbols);
        this.runner.registerBuiltins(symbols);
    }
    override registerBuiltin(name: string, value: any): void {
        this.runner.registerBuiltin(name, value);
    }

    override registerMacros(macros: Record<string, Macro>):void {
        this.emitter.registerMacros(macros);

    }
    override registerMacro(name: string, fct: Macro): void {
        this.emitter.registerMacro(name, fct);
    }

    // steps
    override parse(pycode: string): ParsedCode {
        return this.parser(pycode, "_");
    }
    override emit(parsed: ParsedCode, opts?: Partial<EmitterOptions>): string {
        return this.emitter.emit(parsed, opts);
    }
    override loadAsFunction(jscode: string): (runlib: any) => PyModule {
        return this.runner.loadAsFunction(jscode);
    }
    override runFunction(fct: (runlib: any) => PyModule): PyModule {
        return this.runner.runFunction(fct);
    }
}