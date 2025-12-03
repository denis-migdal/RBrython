import { EmitContext } from "@RBrython/rbry/emitter/EmitContext";
import { HMacro } from "../..";
import { ASTNode } from "@RBrython/rbry/ast/types";
import { isSimple } from "./saveTmp";

export default function tmp(fallback: HMacro, node: ASTNode) {

    if( isSimple(node) )
        return (ctx: EmitContext) => ctx.w_node(node);

    return fallback(node);
}