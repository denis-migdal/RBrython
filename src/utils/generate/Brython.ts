import { SubResults } from "../results";
import { BryRunner } from "../runner";

declare const $B: any;

// jscode = $B.pythonToJS(code);

export default function generateBrython(_ast: any, src:string, results: SubResults) {

    const ast = _ast.bry;

    $B.debug = 0;

    const beg = performance.now();
    const t0 = performance.now();

    const jscode = BryRunner.emit(ast);

    const t1 = performance.now();
    
    results.code = jscode;

    //results.times[results.offset++] += t1 - beg; // total
    results.times[results.offset++] += t0 - beg;
    results.times[results.offset++] += t1 - t0;

    return jscode;
}

// try-catch to get errors...