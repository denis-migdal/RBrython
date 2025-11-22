import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_LOG__(ctx: EmitContext, ...args: ASTNode[]) {

    let result = ctx.w_str("console.log(");

    for(let i = 0; i < args.length; ++i)
        result += ctx.w`${args[i]},`;

    result += ctx.w_str(");");

    return result;
}