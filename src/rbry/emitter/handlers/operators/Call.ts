import { nodeType } from "../../../ast";
import { ASTNode, AttributeNode, CallNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Call(node: CallNode, ctx: EmitContext) {
    const f        = node.func;
    const args     = node.args;
    const keywords = node.keywords;

    // @ts-ignore
    const fid: string = f.id;

    if( fid in ctx.macros)
        return ctx.macros[fid](ctx, ...node.args);

    //TODO: args parsing...
    let str = "";
    for(let i = 0; i < args.length; ++i)
        str += ctx.w`${args[i]}, `;

    if( keywords.length ) {
        str += ctx.w`$RB.setKW({`;
            for( let i = 0; i < keywords.length; ++i)
                str += ctx.w`${keywords[i].arg}: ${keywords[i].value},`;
        str += ctx.w`})`;
    }

    if( nodeType(f) === "Attribute") {
        const m = f as AttributeNode;
        return ctx.w`$RB.mcall(${m.value}, "${m.attr}", ${str} )`;
    }

    return ctx.w`$RB.call(${f}, ${str})`;
}