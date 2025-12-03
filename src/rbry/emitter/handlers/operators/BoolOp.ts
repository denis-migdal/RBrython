import { getOp } from "@RBrython/rbry/ast";
import { BoolOpNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function BoolOp(node: BoolOpNode, ctx: EmitContext) {

    const op = getOp(node.op);

    const a = node.values[0];
    const b = node.values[1];
    
    const cond  = ctx.hm.bool( ctx.hm.saveTmp(a) );
    const saved = ctx.hm.tmp    (a);
    const guard = ctx.hm.withTmp(a);

    if( op === "And" )
        return ctx.w`${guard}(${cond} ? ${b} : ${saved} )`;
    if( op === "Or" )
        return ctx.w`${guard}(${cond} ? ${saved} : ${b} )`;

    throw new Error(`Unknown boolean operator ${op}`);
}