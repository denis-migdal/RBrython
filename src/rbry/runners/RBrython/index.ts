import { macros } from "@SBrython/rbry/emitter/handlers/operators/Call";
import { ASTNode, ParsedCode } from "../../ast/types";
import emit from "../../emitter";
import parse from "../../parser";
import Runner from "../interface";
import { node2js } from "@SBrython/rbry/emitter/node2js";

const builtin_pycode = {
    int  : require("!!raw-loader!../../corelib/int.py").default,
    float: require("!!raw-loader!../../corelib/float.py").default,
    bool : require("!!raw-loader!../../corelib/bool.py").default,
    str  : require("!!raw-loader!../../corelib/str.py").default
}

macros.__JS_WRITE__ = (code: ASTNode) => {
    // @ts-ignore
    return code.value; //TODO: improve
}
macros.__JS_OP__    = (...args: ASTNode[]) => {
    
    if(args.length === 2) // unary op
        // @ts-ignore
        return `${args[0].value}${node2js(args[1])}`;
    
    // binary op
    // @ts-ignore
    return `${node2js(args[0])} ${args[1].value} ${node2js(args[2])}`;
}

function unescape(str: string) {
    str = str.replaceAll("\\n\\", "\n");
    return str;
}

macros.__JS_RUN__    = (...args: ASTNode[]) => {
    // @ts-ignore
    return `(${unescape(args[0].value)})(${args.slice(1).map(e=>node2js(e)).join(",")})`;
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
        return new Function("'use strict';" + jscode) as () => void;
    }
}

/*
 - config: macros, symbols
 - ??Builtin(name, code, cfg)
 - registerBuiltin(name, symb)
 - initialize()
 */