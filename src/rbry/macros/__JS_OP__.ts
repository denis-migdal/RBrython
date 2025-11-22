import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";

export default function __JS_OP__(ctx: EmitContext, ...args: ASTNode[]) {
    
    if(args.length === 2) {// unary op
        // @ts-ignore
        const op = args[0].value;
        return ctx.w`${op}${args[1]}`;
    }
    
    // binary op
    // @ts-ignore
    const op = args[1].value;
    return ctx.w`${args[0]} ${op} ${args[2]}`;
}