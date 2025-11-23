import { ExprNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Expr(node: ExprNode, ctx: EmitContext) {
    ctx.w_node(node.value);
}