import { TypedASTNode } from "@RBrython/rbry/checker/Walker";
import { EmitContext } from "@RBrython/rbry/emitter/EmitContext";
import { HMacro } from "../..";
import { BoolType, isInstance } from "@RBrython/rbry/checker/types";

export default function bool(fallback: HMacro, node: TypedASTNode) {

    if( isInstance(node.result_type, BoolType ) )
        return (ctx: EmitContext) => ctx.w`(${node})`;

    return fallback(node);

    /* 
        return function(ctx: EmitContext) {
            console.warn(node);
            ctx.w`bool(${node})`;
        }
    */
}