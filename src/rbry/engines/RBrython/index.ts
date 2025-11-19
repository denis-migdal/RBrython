import { ParsedCode } from "../../ast/types";
import emit from "../../emitter";
import parse from "../../parser";
import Engine from "../interface";

import "./macros";
import builtins from "./builtins";


export default class RBrythonEngine extends Engine {

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
        for(let name in builtins)
            this.run(builtins[name as keyof typeof builtins]);

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
        return Function("'use strict';" + jscode) as () => void;
    }
}