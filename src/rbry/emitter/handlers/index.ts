// list is filled in list.ts in order to prevent circular dependency.

import { ASTNode } from "../../ast/types";
import { EmitContext } from "../EmitContext";

export type Handler = (    node: ASTNode,
                            ctx: EmitContext) => void;

export type Handlers = Record<string, Handler>;

const handlers: Handlers = {};

export default handlers;