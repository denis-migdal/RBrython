import { ArgsDefNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

//TODO: vararg + kw => dans le corps...
export default function Arguments(node: ArgsDefNode, ctx: EmitContext) {
    
    ctx.w`(`;

    // if method => ignore first parameter...
    let pos_offset = 0;
    let arg_offset = 0;

    const isMethod = ctx.isMethod();

    if( isMethod ) {
        if( node.posonlyargs.length)
            ++pos_offset
        else
            ++arg_offset;
    }

    let d_idx = node.posonlyargs.length + node.args.length - node.defaults.length;

    for(let i = pos_offset; i < node.posonlyargs.length; ++i) {
        ctx.w`${node.posonlyargs[i].arg}`;
        if( d_idx >= i)
            ctx.w` = ${node.defaults[i - d_idx]}`;
        ctx.w`,`;
    }

    d_idx -= node.posonlyargs.length;
    for(let i = arg_offset; i < node.args.length; ++i) {
        ctx.w`_${node.args[i].arg}`;
        if( i >= d_idx)
            ctx.w` = ${node.defaults[node.posonlyargs.length + i - d_idx]}`;
        ctx.w`,`;
    }

    const hasVararg = node.vararg !== undefined

    if( hasVararg )
        ctx.w`...${node.vararg!.arg}`;

    const hasKW = (node.args.length - arg_offset)
                || node.kwarg !== undefined
                || node.kwonlyargs.length;

    if( hasKW && ! hasVararg)
        writeKW(node, ctx, arg_offset);

    // we also include the start of the function/lambda...

    ctx.w`){`;

    if( hasKW && hasVararg ) {
        ctx.w`${ctx.hm.BB()}var `;
        writeKW(node, ctx, arg_offset);
        ctx.w`;${ctx.hm.BE()}`;
    }

    if( hasVararg ) {
        ctx.w`${ctx.hm.BB()}${node.vararg!.arg} = $RB.ro(${node.vararg!.arg});${ctx.hm.BE()}`;
    }

    //TODO: prefer var renaming...
    if( isMethod ) {
        let selfname = "";
        if( node.posonlyargs.length > 0)
            selfname = node.posonlyargs[0].arg;
        else
            selfname = node.args[0].arg;
        ctx.w`${ctx.hm.BB()}const ${selfname} = this;${ctx.hm.BE()}`;
    }
}

function writeKW(node: ArgsDefNode, ctx: EmitContext, arg_offset: number) {

    // kw...
    ctx.w`{`;
    
    // pos
    for( let i = arg_offset ; i < node.args.length; ++i)
        ctx.w`${node.args[i].arg} = _${node.args[i].arg}, `;

    // kw
    for(let i = 0; i < node.kwonlyargs.length; ++i) {
        ctx.w`${node.kwonlyargs[i].arg}`;
        if( node.kw_defaults[i] !== undefined)
            ctx.w` = ${node.kw_defaults[i]}`
        ctx.w`, `
    }

    // **
    if( node.kwarg !== undefined )
        ctx.w`...${node.kwarg.arg}`;

    ctx.w`} = $RB.getKW()`;
}