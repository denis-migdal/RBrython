import { ASTNode } from "../ast/types";
import { EmitContext, Macro } from "../emitter/EmitContext";
import handlers, { Handler, Handlers } from "../emitter/handlers"
import hmacros from "../emitter/hmacros/list";
import SafeOpti_handlers from "./safe/handlers";
import SafeOpti_hmacros from "./safe/hmacros";

// delayed by default in order to be used with ctx.w``.
export type HMacro = (...args: any[]) => ( (ctx: EmitContext) => void);

export type HMacros = Record<string, HMacro>;

export type Optimizer = {
    handlers           : Handlers,
    hmacros            : HMacros,
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

type PatchHMacros = (fallback: HMacro, ...args: any[]) => ((ctx: EmitContext) => void)

function patchHMacros(hmacros: HMacros, patch: PatchHMacros[]) {

    const patchedHMacros = {...hmacros};

    for(let i = 0; i < patch.length; ++i ) {
        const name = patch[i].name;

        const fallback = hmacros[name];
        patchedHMacros[name] = (...args: any[]) => {
            return patch[i](fallback, ...args);
        }
    }

    return patchedHMacros;
}

const safeHandlers = patchHandlers(handlers, SafeOpti_handlers);
const safeHmacros  = patchHMacros(hmacros, SafeOpti_hmacros);

const Optimizers = {
    disabled: {
        handlers,
        hmacros: hmacros,
        require_typechecker: false
    },
    safe    : {
        handlers: safeHandlers,
        hmacros : safeHmacros,
        require_typechecker: true
    },
    unsafe  : {
        handlers: safeHandlers, //TODO...
        hmacros : safeHmacros,
        require_typechecker: true
    }
} satisfies Record<string, Optimizer>

export default Optimizers;