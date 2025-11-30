import { ASTNode } from "../ast/types";
import { EmitContext } from "../emitter/EmitContext";
import handlers, { Handler, Handlers } from "../emitter/handlers"
import SafeOpti from "./safe"

export type Optimizer = {
    handlers           : Record<string, Handler>,
    require_typechecker: boolean
}

type PatchHandler = (node: ASTNode, ctx: EmitContext, fallback: Handler) => void

function patchHandlers(handlers: Handlers, patch: PatchHandler[]) {

    const patchedHandlers = {...handlers};

    for(let i = 0; i < patch.length; ++i ) {
        const name = patch[i].name;

        const fallback = handlers[name];
        patchedHandlers[name] = (node: ASTNode, ctx: EmitContext) => {
            patch[i](node, ctx, fallback);
        }
    }

    return patchedHandlers;
}

const safeHandlers = patchHandlers(handlers, SafeOpti);

const Optimizers = {
    disabled: {
        handlers,
        require_typechecker: false
    },
    safe    : {
        handlers: safeHandlers,
        require_typechecker: true
    },
    unsafe  : {
        handlers: safeHandlers, //TODO...
        require_typechecker: true
    }
} satisfies Record<string, Optimizer>

export default Optimizers;