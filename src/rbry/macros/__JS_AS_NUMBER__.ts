import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_AS_NUMBER__(ctx: EmitContext, node: ASTNode) {
    return ctx.w`Number(${node})`;
}