import { ASTNode, StringNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_RUN__(ctx: EmitContext, code: ASTNode, ...args: ASTNode[]) {
    
    ctx.w`(${unescape((code as StringNode).value)})(`;
    for(let i = 0; i < args.length; ++i)
        ctx.w`${args[i]},`;    
    ctx.w`)`;
}

function unescape(str: string) {
    str = str.replaceAll("\\n\\", "\n");
    return str;
}