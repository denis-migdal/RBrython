import RBrythonGlobalRunner from "@RBrython/rbry/runners/RBrythonGlobalRunner";
import BaseEngine from "../Base";
import parse from "@RBrython/rbry/parser";
import RBrythonEmitter from "@RBrython/rbry/emitter";

export const builtins = {
    object: require("!!raw-loader!../../corelib/primitives/object.py"  ).default,
    type  : require("!!raw-loader!../../corelib/primitives/type.py"  ).default,
    int   : require("!!raw-loader!../../corelib/primitives/int.py"   ).default,
    bool  : require("!!raw-loader!../../corelib/primitives/bool.py"  ).default,
    float : require("!!raw-loader!../../corelib/primitives/float.py" ).default,
    str   : require("!!raw-loader!../../corelib/primitives/str.py"   ).default,
    tuple : require("!!raw-loader!../../corelib/primitives/tuple.py" ).default,

    format: require("!!raw-loader!../../corelib/print/format.py").default,
    repr: require("!!raw-loader!../../corelib/print/repr.py").default,
    print: require("!!raw-loader!../../corelib/print/print.py").default,

    abs  : require("!!raw-loader!../../corelib/operators/abs.py"  ).default,
    len  : require("!!raw-loader!../../corelib/operators/len.py"  ).default,

    range     : require("!!raw-loader!../../corelib/iterators/range.py"  ).default,
    next: require("!!raw-loader!../../corelib/iterators/next.py"  ).default,

    Exception: require("!!raw-loader!../../corelib/Exception.py"  ).default,
    isinstance: require("!!raw-loader!../../corelib/isinstance.py"  ).default,
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
        __JS_SHADOW__: require("@RBrython/rbry/macros/__JS_SHADOW__").default,
    })

    engine.registerModule("JS", globalThis);

    for(let builtin of Object.values(builtins))
        engine.registerBuiltins(builtin);

    return engine;
}