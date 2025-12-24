import RBrythonGlobalRunner from "@RBrython/rbry/runners/RBrythonGlobalRunner";
import BaseEngine from "../Base";
import parse from "@RBrython/rbry/parser";
import RBrythonEmitter from "@RBrython/rbry/emitter";
import corelib from "@RBrython/rbry/corelib/list";
import macros from "@RBrython/rbry/macros/list";

export default function RBrythonEngineFactory() {

    const emitter = new RBrythonEmitter();
    const runner  = new RBrythonGlobalRunner();
    const engine = new BaseEngine(parse, emitter, runner);

    engine.registerMacros(macros);

    engine.registerModule("JS", globalThis);

    for(let builtin of Object.values(corelib))
        engine.registerBuiltins(builtin);

    return engine;
}