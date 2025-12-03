import { ASTNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "@RBrython/rbry/emitter/EmitContext";
import { HMacro } from "../..";
import { isSimple } from "./saveTmp";

export default function withTmp(fallback: HMacro, node: ASTNode) {

    console.warn(isSimple(node), node);

    if( isSimple(node) )
        return (_: EmitContext) => {};

    return fallback(node);
}