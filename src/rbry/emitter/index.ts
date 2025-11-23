// quick h4ck (should move it).
import "../runlib";
import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import SourceMap from "./SourceMap";
import { EmitContext, Macro } from "./EmitContext";
import globalExport from "./exports/global";
import returnExport from "./exports/return";
import moduleExport from "./exports/module";
import brythonExport from "./exports/brython";
import RawTarget from "./targets/raw";

export type Target = {
    defaults : Partial<EmitterOptions>
    transform: (jscode: string, sync: boolean) => string;
}

export type JSCode = {
    name    : string,
    jscode  : string,
    imported: string[],
    exported: string[],
}

export const enum MODE {
  DEBUG,
  TEST,
  PROD,
}

export const enum EXPORT {
    NONE    = 0,
    GLOBAL  = 1<<0,
    MODULE  = 1<<1,
    RETURN  = 1<<2,
    BRYTHON = 1<<3,
}

export type EmitterOptions = {
    mode   : MODE,
    target : Target,
    exports: EXPORT,
    sync   : boolean
}

const EmitterDefaults: EmitterOptions = {
    mode   : MODE.DEBUG,
    target : RawTarget,
    exports: EXPORT.NONE,
    sync   : false
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

    emit(parsed: ParsedCode, options: Partial<EmitterOptions> = {}) {

        const name = "_";

        const opts: EmitterOptions = Object.assign({}, 
                                        EmitterDefaults,
                                        options.target?.defaults,
                                        options);

        const ctx = new EmitContext(parsed.symtable,
                                    opts.mode,
                                    this.macros,
                                    opts.sync);

        const exported = this.extractExportedSymbols(parsed);
        let jscode     = ctx.w_body(parsed.ast.body);

        if( opts.exports & EXPORT.GLOBAL)
            jscode += globalExport(name, exported);
        if( opts.exports & EXPORT.MODULE)
            jscode += moduleExport(name, exported);
        if( opts.exports & EXPORT.RETURN)
            jscode += returnExport(name, exported);
        if( opts.exports & EXPORT.BRYTHON) {
            jscode += brythonExport(name, exported);
        }

        const output = {
            name,
            imported: [],
            exported,
            jscode,
        }

        return opts.target.transform(jscode, opts.sync!)
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