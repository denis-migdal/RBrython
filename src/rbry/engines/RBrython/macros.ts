import { ASTNode } from "@RBrython/rbry/ast/types";
import { macros } from "../../emitter/handlers/operators/Call";
import { node2js } from "@RBrython/rbry/emitter/node2js";

macros.__DISPATCH__ = (...args: ASTNode[]) => {

    let result = `((fct) => {

        const registered = {`;

    // @ts-ignore
    for(let i = 0; i < args[0].keys.length; ++i) {
        // @ts-ignore
        result += `${node2js(args[0].keys[i])}: ${node2js(args[0].values[i])},`;
    }

    result += `};
    
        function _(...args) {
            let f = registered[type(args[0]).name];
            if( f === undefined )
                f = fct;
            return f.call(null, this, ...args);
        }

        Object.defineProperty(_, "name", {value: fct.name});
    
        return _;
    })`;

    return result;
}

macros.__JS_WRITE__ = (code: ASTNode) => {
    // @ts-ignore
    return code.value; //TODO: improve
}
macros.__JS_OP__    = (...args: ASTNode[]) => {
    
    if(args.length === 2) // unary op
        // @ts-ignore
        return `${args[0].value}${node2js(args[1])}`;
    
    // binary op
    // @ts-ignore
    return `${node2js(args[0])} ${args[1].value} ${node2js(args[2])}`;
}

function unescape(str: string) {
    str = str.replaceAll("\\n\\", "\n");
    return str;
}

macros.__JS_RUN__    = (...args: ASTNode[]) => {
    // @ts-ignore
    return `(${unescape(args[0].value)})(${args.slice(1).map(e=>node2js(e)).join(",")})`;
}
