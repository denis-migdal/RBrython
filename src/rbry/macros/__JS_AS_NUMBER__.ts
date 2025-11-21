import { ASTNode } from "../ast/types";
import { node2js } from "../emitter/node2js";

export default function __JS_AS_NUMBER__(node: ASTNode) {
    return `Number(${node2js(node)})`;
}