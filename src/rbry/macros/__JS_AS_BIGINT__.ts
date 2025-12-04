import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_AS_BIGINT__(ctx: EmitContext, node: ASTNode) {
    ctx.w`BigInt(${node})`;
}