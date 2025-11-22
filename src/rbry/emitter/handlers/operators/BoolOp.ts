import { getOp } from "@RBrython/rbry/ast";
import { BoolOpNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function BoolOp(node: BoolOpNode, ctx: EmitContext) {

    const op = getOp(node.op);

    let jsop = "";
    if( op === "Or")
        jsop = "||";
    if( op === "And")
        jsop = "&&";

    return ctx.w`${node.values[0]}${jsop}${node.values[1]}`;
}