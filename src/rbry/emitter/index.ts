// quick h4ck (should move it).
import "../runlib";
import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import { Target } from "../targets/interface";
import { RawTarget } from "../targets/raw";
import SourceMap from "./SourceMap";
import { EmitContext, Macro } from "./EmitContext";

export enum MODE {
  DEBUG,
  TEST,
  PROD,
}

export type EmitterOptions = {
    mode  : MODE,
    target: Target
}

const EmitterDefaults: EmitterOptions = {
    mode  : MODE.DEBUG,
    target: RawTarget
}

export abstract class Emitter {
    abstract emit(parsed: ParsedCode, opts?: Partial<EmitterOptions>): string;

    abstract registerMacros(macros: Record<string, Macro>):void;
    abstract registerMacro(name: string, fct: Macro): void;
}

export default class RBrythonEmitter extends Emitter {

    protected readonly macros: Record<string, Macro> = {};

    registerMacros(macros: Record<string, Macro>) {
        for(let name in macros)
            this.macros[name] = macros[name];
    }
    registerMacro(name: string, fct: Macro) {
        this.macros[name] = fct;
    }

    emit(parsed: ParsedCode, {
                                mode   = EmitterDefaults.mode,
                                target = EmitterDefaults.target
                            }: Partial<EmitterOptions> = {}) {

        const ctx = new EmitContext(parsed.symtable, mode, this.macros);

        const output = {
            name    : "_",
            imported: [],
            exported: this.extractExportedSymbols(parsed),
            jscode  : ctx.w_body(parsed.ast.body),
        }

        return target(output);
    }

    private extractExportedSymbols(parsed: ParsedCode) {
        
        const symbols = parsed.symtable.symbols.$strings
        return Object.keys(symbols)
                     .filter( k => symbols[k] === 4098); // magic value
    }
}

/*
TODO: filter...
const sm = new SourceMap("a", "b", "c");
sm.addMapping({line: 3, col: 4}, {line: 3, col: 5});
sm.addMapping({line: 3, col: 5}, {line: 3, col: 5});

console.warn(sm.toFile());
*/