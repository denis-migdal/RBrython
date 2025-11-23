import { ASTNode, StringNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_WRITE__(ctx: EmitContext, code: ASTNode) {
    ctx.w_str((code as StringNode).value);
}