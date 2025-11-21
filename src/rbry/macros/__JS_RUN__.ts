import { ASTNode } from "../ast/types";
import { node2js } from "../emitter/node2js";

export default function __JS_RUN__(...args: ASTNode[]) {
    // @ts-ignore
    return `(${unescape(args[0].value)})(${args.slice(1).map(e=>node2js(e)).join(",")})`;
}

function unescape(str: string) {
    str = str.replaceAll("\\n\\", "\n");
    return str;
}