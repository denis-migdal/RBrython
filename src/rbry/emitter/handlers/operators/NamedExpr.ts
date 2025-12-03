import { NamedExprNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function NamedExpr(node: NamedExprNode, ctx: EmitContext) {
    return ctx.w`(${node.target} = ${node.value})`
}