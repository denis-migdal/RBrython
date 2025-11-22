import { ArgsDefNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

//TODO: vararg + kw => dans le corps...
export default function Arguments(node: ArgsDefNode, ctx: EmitContext) {
    
    let result = "";

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
        result += ctx.w`${node.posonlyargs[i].arg}, `;

    for(let i = arg_offset; i < node.args.length; ++i)
        result += ctx.w`_${node.args[i].arg}, `;

    if( node.args.length ) {
        // kw...
        result += ctx.w`{`;
        for( let i = arg_offset ; i < node.args.length; ++i)
            result += ctx.w`${node.args[i].arg} = _${node.args[i].arg}, `;
        result += ctx.w`} = $RB.getKW()`;
    }

    return result;
}