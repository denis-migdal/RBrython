import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_LOG__(ctx: EmitContext, ...args: ASTNode[]) {

    ctx.w_str("console.log(");

    for(let i = 0; i < args.length; ++i)
        ctx.w`${args[i]},`;

    ctx.w_str(");");
}