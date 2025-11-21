import { ASTNode } from "../ast/types";
import { node2js } from "../emitter/node2js";

export default function __JS_LOG__(...args: ASTNode[]) {

    let result = "console.log(";

    for(let i = 0; i < args.length; ++i)
        result += node2js(args[i]) + ",";

    result += ");"

    return result;
}