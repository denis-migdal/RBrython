import { ASTNode, StringNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_RUN__(ctx: EmitContext, code: ASTNode, ...args: ASTNode[]) {
    
    let result = ctx.w`(${unescape((code as StringNode).value)})(`;
    for(let i = 0; i < args.length; ++i)
        result += ctx.w`${args[i]},`;    
    result += ctx.w`)`;

    return result;
}

function unescape(str: string) {
    str = str.replaceAll("\\n\\", "\n");
    return str;
}