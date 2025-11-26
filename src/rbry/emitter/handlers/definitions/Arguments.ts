import { ArgsDefNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

//TODO: vararg + kw => dans le corps...
export default function Arguments(node: ArgsDefNode, ctx: EmitContext) {
    
    // if method => ignore first parameter...
    let pos_offset = 0;
    let arg_offset = 0;

    if( ctx.isMethod() ) {
        if( node.posonlyargs.length)
            ++pos_offset
        else
            ++arg_offset;
    }

    for(let i = pos_offset; i < node.posonlyargs.length; ++i)
        ctx.w`${node.posonlyargs[i].arg}, `;

    for(let i = arg_offset; i < node.args.length; ++i)
        ctx.w`_${node.args[i].arg}, `;

    // @ts-ignore
    if( node.vararg !== undefined ) {
        // @ts-ignore
        ctx.w`...${node.vararg.arg}`;
    }

    if( node.args.length - arg_offset) {
        // kw...
        ctx.w`{`;
        for( let i = arg_offset ; i < node.args.length; ++i)
            ctx.w`${node.args[i].arg} = _${node.args[i].arg}, `;
        ctx.w`} = $RB.getKW()`;
    }
}