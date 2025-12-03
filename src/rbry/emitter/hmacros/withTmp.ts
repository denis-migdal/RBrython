import { ASTNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../EmitContext";

export default function withTmp(_: ASTNode) {
    return function(ctx: EmitContext) {
        ctx.w`$RB.withTmp`;
    }
}