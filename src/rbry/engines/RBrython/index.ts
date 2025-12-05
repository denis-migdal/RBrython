import RBrythonGlobalRunner from "@RBrython/rbry/runners/RBrythonGlobalRunner";
import BaseEngine from "../Base";
import parse from "@RBrython/rbry/parser";
import RBrythonEmitter from "@RBrython/rbry/emitter";

export const builtins = {
    object: require("!!raw-loader!../../corelib/object.py"  ).default,
    type  : require("!!raw-loader!../../corelib/type.py"  ).default,
    int   : require("!!raw-loader!../../corelib/int.py"   ).default,
    bool  : require("!!raw-loader!../../corelib/bool.py"  ).default,
    float : require("!!raw-loader!../../corelib/float.py" ).default,
    str   : require("!!raw-loader!../../corelib/str.py"   ).default,
    format: require("!!raw-loader!../../corelib/format.py").default,
    Exception: require("!!raw-loader!../../corelib/Exception.py"  ).default,
    isinstance: require("!!raw-loader!../../corelib/isinstance.py"  ).default,
    range     : require("!!raw-loader!../../corelib/range.py"  ).default,
    mfct  : require("!!raw-loader!../../corelib/mfct.py"  ).default,
    next: require("!!raw-loader!../../corelib/next.py"  ).default,
}

export default function RBrythonEngineFactory() {

    const emitter = new RBrythonEmitter();
    const runner  = new RBrythonGlobalRunner();
    const engine = new BaseEngine(parse, emitter, runner);

    engine.registerMacros({

        __JS_OP__       : require("@RBrython/rbry/macros/__JS_OP__").default,
        __JS_AWAIT__    : require("@RBrython/rbry/macros/__JS_AWAIT__").default,
        __JS_RUN__      : require("@RBrython/rbry/macros/__JS_RUN__").default,
        __JS_WRITE__    : require("@RBrython/rbry/macros/__JS_WRITE__").default,
        __JS_LOG__      : require("@RBrython/rbry/macros/__JS_LOG__").default,
        __JS_AS_STRING__: require("@RBrython/rbry/macros/__JS_AS_STRING__").default,
        __JS_AS_NUMBER__: require("@RBrython/rbry/macros/__JS_AS_NUMBER__").default,
        __JS_AS_BIGINT__: require("@RBrython/rbry/macros/__JS_AS_BIGINT__").default,
    })

    engine.registerModule("JS", globalThis);

    for(let builtin of Object.values(builtins))
        engine.registerBuiltins(builtin);

    return engine;
}