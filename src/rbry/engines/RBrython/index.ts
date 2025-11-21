import "./macros";

import builtins from "./builtins";
import RBrythonGlobalRunner from "@RBrython/rbry/runners/RBrythonGlobalRunner";
import BaseEngine from "../Base";
import parse from "@RBrython/rbry/parser";
import RBrythonEmitter from "@RBrython/rbry/emitter";

export default function RBrythonEngineFactory() {

    const emitter = new RBrythonEmitter();
    const runner  = new RBrythonGlobalRunner();
    const engine = new BaseEngine(parse, emitter, runner);

    engine.registerModule("JS", globalThis);

    for(let name in builtins)
        engine.registerBuiltins(builtins[name as keyof typeof builtins]);

    return engine;
}