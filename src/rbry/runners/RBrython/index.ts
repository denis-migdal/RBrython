import { ParsedCode } from "../../ast/types";
import emit from "../../emitter";
import parse from "../../parser";
import Runner from "../interface";

const builtin_pycode = {
    int  : require("!!raw-loader!../../corelib/int.py").default,
    float: require("!!raw-loader!../../corelib/float.py").default,
    bool : require("!!raw-loader!../../corelib/bool.py").default,
    str  : require("!!raw-loader!../../corelib/str.py").default
}

export default class RBrythonRunner extends Runner {

    constructor() {
        super();
        this.initialize(); // by default initialize immediately.
    }

    run(pycode: string) {
        this.loadAsFunction(this.emit(this.parse(pycode)))();
    }
    // builtins

    // initialize
    #initialized = false;
    initialize() {
        for(let name in builtin_pycode)
            this.run(builtin_pycode[name as keyof typeof builtin_pycode]);

        this.#initialized = true;
    }

    // low level
    parse(pycode: string): ParsedCode {
        return parse(pycode, "_");
    }
    emit(ast: ParsedCode) {
        return emit(ast);
    }
    loadAsFunction(jscode: string) {
        return new Function(jscode) as () => void;
    }
}

/*
 - config: macros, symbols
 - ??Builtin(name, code, cfg)
 - registerBuiltin(name, symb)
 - initialize()
 */