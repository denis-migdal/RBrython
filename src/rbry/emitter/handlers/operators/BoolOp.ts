import { getOp } from "@RBrython/rbry/ast";
import { ASTNode } from "@RBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function BoolOp(node: ASTNode) {

    // @ts-ignore
    const op = getOp(node.op);

    let jsop = "";
    if( op === "Or")
        jsop = "||";
    if( op === "And")
        jsop = "&&";

    // @ts-ignore
    return `${node2js(node.values[0])}${jsop}${node2js(node.values[1])}`;
}