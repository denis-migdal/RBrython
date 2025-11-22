import { ASTNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Continue(node: ASTNode, ctx: EmitContext) {
    return ctx.w`continue;`
}