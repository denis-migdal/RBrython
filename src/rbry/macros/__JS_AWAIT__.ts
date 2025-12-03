import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_AWAIT__(ctx: EmitContext, node: ASTNode) {
    ctx.w`await ${node}`;
}

