import { getOp } from "@RBrython/rbry/ast";
import { BoolOpNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function BoolOp(node: BoolOpNode, ctx: EmitContext) {

    const op = getOp(node.op);

    const jsop = op.toLowerCase();
    return ctx.w`$RB.op(${node.values[0]}, "${jsop}", ${node.values[1]})`
}