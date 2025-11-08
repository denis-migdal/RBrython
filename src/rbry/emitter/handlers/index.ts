// list is filled in list.ts in order to prevent circular dependency.

import { ASTNode } from "@SBrython/rbry/ast/types";

export type Handler = (node: ASTNode) => string;

const Handlers: Record<string, Handler> = {};

export default Handlers;