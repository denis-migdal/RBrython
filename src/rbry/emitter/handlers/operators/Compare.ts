import { CompareNode } from "../../../ast/types";
import { getOp } from "../../../ast/";
import { EmitContext } from "../../EmitContext";

export default function Compare(node: CompareNode, ctx: EmitContext) {

    let prev = node.left;
    for(let i = 0; i < node.ops.length; ++i) {

        const isFirst = i === 0;
        const isLast  = i === node.ops.length - 1

        let op = getOp(node.ops[i]) as keyof typeof cmpops | "Is" | "IsNot" | "NotIn";

        let a: any = prev;
        if( ! isFirst )
            a = ctx.hm.getTmp(prev);

        let b: any = prev = node.comparators[i];
        if( ! isLast )
            b = ctx.hm.saveTmp(b);

        if(! isFirst)
            ctx.w` && `;

        // TODO: if has next... (saveTmp())
        // TODO: if has prev... (getTmp())

        if( op === 'Is' ) {
            ctx.w`${a} === ${b}`;
            continue;
        }
        if( op === 'IsNot' ) {
            ctx.w`${a} !== ${b}`;
            continue;
        }
        if( op === "NotIn") {
            ctx.w_str("!");
            op = "In";
        }
        if( op === "In") {
            ctx.w`$RB.in(${a}, ${b})`
            continue;
        }
        
        const opname = cmpops[op];
        if( opname === undefined) {
            console.warn(op);
            throw new Error(`CmpOp ${op} not impl`);
        }

        ctx.w`$RB.op(${a}, "${opname}", ${b})`;
    }
}

const cmpops = {
    Eq   : "eq",
    NotEq: "ne",
    Gt   : "gt",
    GtE  : "ge",
    Lt   : "lt",
    LtE  : "le",
    In   : "contains"
}
