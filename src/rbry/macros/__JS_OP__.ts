import { ASTNode } from "../ast/types";
import { node2js } from "../emitter/node2js";

export default function __JS_OP__(...args: ASTNode[]) {
    
    if(args.length === 2) // unary op
        // @ts-ignore
        return `${args[0].value}${node2js(args[1])}`;
    
    // binary op
    // @ts-ignore
    return `${node2js(args[0])} ${args[1].value} ${node2js(args[2])}`;
}