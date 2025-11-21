import { ASTNode } from "@RBrython/rbry/ast/types";
import { macros } from "../../emitter/handlers/operators/Call";
import { node2js } from "@RBrython/rbry/emitter/node2js";

macros.__JS_OP__    = (...args: ASTNode[]) => {
    
    if(args.length === 2) // unary op
        // @ts-ignore
        return `${args[0].value}${node2js(args[1])}`;
    
    // binary op
    // @ts-ignore
    return `${node2js(args[0])} ${args[1].value} ${node2js(args[2])}`;
}

macros.__JS_RUN__    = (...args: ASTNode[]) => {
    // @ts-ignore
    return `(${unescape(args[0].value)})(${args.slice(1).map(e=>node2js(e)).join(",")})`;
}

macros.__JS_WRITE__ = (code: ASTNode) => {
    // @ts-ignore
    return code.value; //TODO: improve
}

function unescape(str: string) {
    str = str.replaceAll("\\n\\", "\n");
    return str;
}