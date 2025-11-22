import { ParsedCode } from "../../ast/types";
import parse from "../../parser";
import BrythonGlobalRunner from "@RBrython/rbry/runners/BrythonGlobalRunner";
import BaseEngine from "../Base";
import { Emitter } from "@RBrython/rbry/emitter";
import { Macro } from "@RBrython/rbry/emitter/EmitContext";

class BrythonEmitter extends Emitter {
    emit(parsed: ParsedCode) {

        let imported:any;
        return $B.js_from_root({ast     : parsed.ast,
                                symtable: parsed.symtable,
                                filename: parsed.filename,
                                src     : parsed.pycode,
                                imported}).js
    }

    override registerMacros(macros: Record<string, Macro>) {
        throw new Error("Not implemented");
    }
    override registerMacro(name: string, fct: Macro) {
        throw new Error("Not implemented");
    }
}

export default function BrythonEngineFactory() {

    const emitter = new BrythonEmitter();
    const runner  = new BrythonGlobalRunner();
    const engine  = new BaseEngine(parse, emitter, runner);

    engine.registerModule("JS", globalThis);
    
    // builtins are already included in Brython.

    return engine;
}