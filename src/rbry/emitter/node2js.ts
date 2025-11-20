import { nodeType } from "../ast";
import { ASTNode, SymTab } from "../ast/types";
import Handlers from "./handlers";

export function node2js(node: ASTNode, symtab?: SymTab, ...args: unknown[]): string {

    const handler = Handlers[nodeType(node) as keyof typeof Handlers];

    if( handler === undefined) {
        console.warn(node);
        throw new Error(`Node type ${nodeType(node)} is unknown`);
    }

    return handler(node, symtab, ...args);
}
