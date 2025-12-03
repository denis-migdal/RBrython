import { ASTNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../EmitContext";

export default function bool(node: ASTNode) {
    return function(ctx: EmitContext) {
        ctx.w`bool(${node})`;
    }
}