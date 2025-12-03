import { nodeType } from "@RBrython/rbry/ast";
import { CallNode } from "@RBrython/rbry/ast/types";
import { FunctionType, isInstance } from "@RBrython/rbry/checker/types";
import { EmitContext } from "@RBrython/rbry/emitter/EmitContext";
import { Handler     } from "@RBrython/rbry/emitter/handlers";
import { writeArgs   } from "@RBrython/rbry/emitter/handlers/operators/Call";

export default function Call(node    : CallNode,
                             ctx     : EmitContext,
                             fallback: Handler) {

    //TODO: better assert type...
    if( nodeType(node.func) === "Name"
        // @ts-ignore
        && ctx.symtab.typedSymbols !== undefined) {
        // @ts-ignore
        const name: string = node.func.id;

        // @ts-ignore
        const type = ctx.symtab.typedSymbols[name];
        if( isInstance(type, FunctionType) ) {
            ctx.w`${name}(`;
            writeArgs(node, ctx);
            ctx.w`)`;

            return;
        }
    }

    fallback(node, ctx);
}