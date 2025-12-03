import { TypedASTNode } from "@RBrython/rbry/checker/Walker";
import { EmitContext } from "@RBrython/rbry/emitter/EmitContext";
import { HMacro } from "../..";

export default function bool(fallback: HMacro, node: TypedASTNode) {

    console.warn(node);

    return fallback(node);

    /* 
        return function(ctx: EmitContext) {
            console.warn(node);
            ctx.w`bool(${node})`;
        }
    */
}