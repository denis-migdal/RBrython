// list is filled in list.ts in order to prevent circular dependency.

import { ASTNode, SymTab } from "../../ast/types";

export type Handler = (    node: ASTNode,
                        symtab?: SymTab,
                        ...args: unknown[]) => string;

const Handlers: Record<string, Handler> = {};

export default Handlers;