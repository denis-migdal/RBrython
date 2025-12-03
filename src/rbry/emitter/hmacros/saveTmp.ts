import { ASTNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../EmitContext";

export default function saveTmp(node: ASTNode) {
    return function(ctx: EmitContext) {
        ctx.w`$RB.saveTmp(${node})`;
    }
}