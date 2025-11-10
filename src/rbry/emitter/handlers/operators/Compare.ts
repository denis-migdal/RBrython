import { CompareNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";
import { getOp } from "@SBrython/rbry/ast";

export default function Compare(node: CompareNode) {

    const a = node.left;
    const op = getOp(node.ops[0]) as keyof typeof cmpops | "Is";
    const b  = node.comparators[0];

    if( op === 'Is' ) return `__JS_FROM_OPI__(${node2js(a)}, "===", ${node2js(b)})`;
    
    const opname = cmpops[op];
    if( opname === undefined) {
        console.warn(op);
        throw new Error(`CmpOp ${op} not impl`);
    }

    return `$RB.op(${node2js(a)}, "${opname}", ${node2js(b)})`;
}

const cmpops = {
    Eq   : "eq",
    NotEq: "ne"
}
