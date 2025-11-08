import { nodeType } from "../ast";
import { ASTNode } from "../ast/types";
import Handlers from "./handlers";
import "./handlers/list"; // ensure Handlers are loaded.

export function node2js(node: ASTNode): string {

    const handler = Handlers[nodeType(node) as keyof typeof Handlers];

    if( handler === undefined) {
        console.warn(node);
        throw new Error(`Node type ${nodeType(node)} is unknown`);
    }

    return handler(node);
}

let inClass = false;

