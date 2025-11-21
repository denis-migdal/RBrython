import { ASTNode } from "../ast/types";
import { node2js } from "../emitter/node2js";

export default function __JS_AS_STRING__(node: ASTNode) {
    return "`${"+ node2js(node) + "}`";
}