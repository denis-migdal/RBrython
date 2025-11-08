import {_sb_, _r_} from "@SBrython/runtime";

// declare all builtin types...
//import '@SBrython/sbry/structs/STypeBuiltin';

// ^ TODO: move out...

import { SubResults } from "../results";
import emit from "@SBrython/rbry/emitter";

export default function generateSBrython(_ast: any, results: SubResults) {

    if( _ast.sbry === null) {

        const __ast = _ast.bry;
        const beg = performance.now();

        const filename = "_";

        const ast = {
            ast: __ast,
            filename
        }

        const t0 = performance.now();

        const jscode = emit(ast);

        const t1 = performance.now();

        results.code  = jscode;
        results.ast   = ast;

        //results.times[results.offset++] += t1 - beg; // total
        results.times[results.offset++] += t0 - beg;
        results.times[results.offset++] += t1 - t0;

        return jscode;
    }

    const ast = _ast.sbry;
    const beg = performance.now();
    const t0  = performance.now();

    const jscode = emit(ast);

    const t1 = performance.now();

    results.code  = jscode;
    results.ast   = ast;

    //results.times[results.offset++] += t1 - beg; // total
    results.times[results.offset++] += t0 - beg;
    results.times[results.offset++] += t1 - t0;   

    return jscode;
}