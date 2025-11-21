// quick h4ck (should move it).
import "../runlib";
import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import Body from "./handlers/Body";
import { Macro, macros } from "./handlers/operators/Call";

export enum MODE {
  DEBUG,
  TEST,
  PROD,
}

export abstract class Emitter {
    abstract emit(parsed: ParsedCode, mode?: MODE): string;

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

    emit(parsed: ParsedCode, mode: MODE = MODE.DEBUG) {

        // @ts-ignore
        globalThis.mode = mode;

        const bodyNode = parsed.ast.body;

        const body   = Body(bodyNode, parsed.symtable);
        const exports= this.extractExportedSymbols(parsed);

        // @ts-ignore
        return `const __debug__ = ${globalThis.mode === MODE.DEBUG};\n${body}\nconst __exported__ = {${exports.join(",")}}`;
    }

    private extractExportedSymbols(parsed: ParsedCode) {
        
        const symbols = parsed.symtable.symbols.$strings
        return Object.keys(symbols)
                     .filter( k => symbols[k] === 4098); // magic value
    }
}
