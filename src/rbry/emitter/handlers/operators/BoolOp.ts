import { getOp } from "@RBrython/rbry/ast";
import { BoolOpNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function BoolOp(node: BoolOpNode, ctx: EmitContext) {

    const op = getOp(node.op);

    if( op === "And" )
        return ctx.w`$RB.withTmp(bool($RB.saveTmp(${node.values[0]})) ? ${node.values[1]} : $RB.tmp() )`;
    if( op === "Or" )
        return ctx.w`$RB.withTmp(bool($RB.saveTmp(${node.values[0]})) ? $RB.tmp() : ${node.values[1]} )`;

    throw new Error(`Unknown boolean operator ${op}`);
}