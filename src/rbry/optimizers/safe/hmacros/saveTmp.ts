import { ASTNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "@RBrython/rbry/emitter/EmitContext";
import { HMacro } from "../..";
import { nodeType } from "@RBrython/rbry/ast";

export function isSimple(node: ASTNode) {

    const type = nodeType(node);

    return type === "Constant" || type === "Name";
}

export default function saveTmp(fallback: HMacro, node: ASTNode) {

    if( isSimple(node) )
        return (ctx: EmitContext) => ctx.w_node(node);

    return fallback(node);
}