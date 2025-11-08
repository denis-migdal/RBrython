import { ASTNode, OperatorNode } from "./types";

export function nodeType(node: ASTNode): string {
    // @ts-ignore
    return node.constructor.$name;
}

export function getOp(op: OperatorNode): string {
    // @ts-ignore
    return op.constructor.$name
}