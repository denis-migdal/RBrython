// quick h4ck (should move it).
import "../runlib";
import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import Body from "./handlers/Body";
import { Macro, macros } from "./handlers/operators/Call";
import { Target } from "../targets/interface";
import { RawTarget } from "../targets/raw";

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

    protected readonly macros = macros;

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

        // @ts-ignore
        globalThis.mode = mode;

        const bodyNode = parsed.ast.body;

        const body    = Body(bodyNode, parsed.symtable);
        const exported= this.extractExportedSymbols(parsed);

        const jscode = body;

        const output = {
            name    : "_",
            imported: [],
            exported,
            jscode,
        }

        return target(output);
    }

    private extractExportedSymbols(parsed: ParsedCode) {
        
        const symbols = parsed.symtable.symbols.$strings
        return Object.keys(symbols)
                     .filter( k => symbols[k] === 4098); // magic value
    }
}
