import { CompareNode } from "../../../ast/types";
import { getOp } from "../../../ast/";
import { EmitContext } from "../../EmitContext";

export default function Compare(node: CompareNode, ctx: EmitContext) {

    const a = node.left;
    const op = getOp(node.ops[0]) as keyof typeof cmpops | "Is";
    const b  = node.comparators[0];

    if( op === 'Is' ) return ctx.w`${a} === ${b}`;
    
    const opname = cmpops[op];
    if( opname === undefined) {
        console.warn(op);
        throw new Error(`CmpOp ${op} not impl`);
    }

    return ctx.w`$RB.op(${a}, "${opname}", ${b})`;
}

const cmpops = {
    Eq   : "eq",
    NotEq: "ne"
}
