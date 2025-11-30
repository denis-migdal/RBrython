import { nodeType } from "../../../ast";
import { AttributeNode, CallNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Call(node: CallNode, ctx: EmitContext) {
    const f        = node.func;

    // @ts-ignore
    const fid: string = f.id;

    if( fid in ctx.macros) {
        ctx.macros[fid](ctx, ...node.args);
        return;
    }

    if( nodeType(f) === "Attribute") {
        const m = f as AttributeNode;
        ctx.w`$RB.mcall(${m.value}, "${m.attr}", `;
    } else {
        ctx.w`$RB.call(${f}, `;
    }

    writeArgs(node, ctx);

    ctx.w_str(")");
}

export function writeArgs(node: CallNode, ctx: EmitContext) {

    const args     = node.args;
    const keywords = node.keywords;

    //TODO: args parsing...
    for(let i = 0; i < args.length; ++i)
        ctx.w`${args[i]}, `;

    if( keywords.length ) {
        ctx.w`$RB.setKW({`;
            for( let i = 0; i < keywords.length; ++i)
                ctx.w`${keywords[i].arg}: ${keywords[i].value},`;
        ctx.w`})`;
    }
}