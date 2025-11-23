import { ASTNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Break(node: ASTNode, ctx: EmitContext) {
    ctx.w_str("break;");
}