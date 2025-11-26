import { CompareNode } from "../../../ast/types";
import { getOp } from "../../../ast/";
import { EmitContext } from "../../EmitContext";

export default function Compare(node: CompareNode, ctx: EmitContext) {

    const a = node.left;
    const op = getOp(node.ops[0]) as keyof typeof cmpops | "Is" | "IsNot";
    const b  = node.comparators[0];

    if( op === 'Is' ) {
        ctx.w`${a} === ${b}`;
        return;
    }
    if( op === 'IsNot' ) {
        ctx.w`${a} !== ${b}`;
        return;
    }
    
    const opname = cmpops[op];
    if( opname === undefined) {
        console.warn(op);
        throw new Error(`CmpOp ${op} not impl`);
    }

    ctx.w`$RB.op(${a}, "${opname}", ${b})`;
}

const cmpops = {
    Eq   : "eq",
    NotEq: "ne",
}
