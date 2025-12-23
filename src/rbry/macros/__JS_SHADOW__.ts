import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_SHADOW__(ctx: EmitContext, jstype: ASTNode) {
    ctx.w`$RB.shadowJS(${jstype})`;
}