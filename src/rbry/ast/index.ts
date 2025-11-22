import { ASTNode, OperatorNode } from "./types";

export function isASTNode(o: unknown): o is ASTNode {
    if( o == null)
        return false;
    return "$name" in (o as object).constructor;
}

export function nodeType(node: ASTNode): string {
    // @ts-ignore
    return node.constructor.$name;
}

export function getOp(op: OperatorNode): string {
    // @ts-ignore
    return op.constructor.$name
}