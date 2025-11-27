import RBrythonGlobalRunner from "@RBrython/rbry/runners/RBrythonGlobalRunner";
import BaseEngine from "../Base";
import parse from "@RBrython/rbry/parser";
import RBrythonEmitter from "@RBrython/rbry/emitter";
import __JS_OP__ from "@RBrython/rbry/macros/__JS_OP__";
import __JS_RUN__ from "@RBrython/rbry/macros/__JS_RUN__";
import __JS_WRITE__ from "@RBrython/rbry/macros/__JS_WRITE__";
import __JS_LOG__ from "@RBrython/rbry/macros/__JS_LOG__";
import __JS_AS_STRING__ from "@RBrython/rbry/macros/__JS_AS_STRING__";
import __JS_AS_NUMBER__ from "@RBrython/rbry/macros/__JS_AS_NUMBER__";

export const builtins = {

    type : require("!!raw-loader!../../corelib/type.py"  ).default,
    int  : require("!!raw-loader!../../corelib/int.py"   ).default,
    bool : require("!!raw-loader!../../corelib/bool.py"  ).default,
    float: require("!!raw-loader!../../corelib/float.py" ).default,
    str  : require("!!raw-loader!../../corelib/str.py"   ).default,
    //    require("!!raw-loader!../../corelib/mfct.py"  ).default
}

export default function RBrythonEngineFactory() {

    const emitter = new RBrythonEmitter();
    const runner  = new RBrythonGlobalRunner();
    const engine = new BaseEngine(parse, emitter, runner);

    engine.registerMacros({
        __JS_OP__,
        __JS_AS_STRING__,
        __JS_AS_NUMBER__,
        __JS_LOG__,
        __JS_RUN__,
        __JS_WRITE__,
    })

    engine.registerModule("JS", globalThis);

    for(let builtin of Object.values(builtins))
        engine.registerBuiltins(builtin);

    return engine;
}