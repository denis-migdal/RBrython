import { ArgsDefNode, SymTab } from "@RBrython/rbry/ast/types";

//TODO: vararg + kw => dans le corps...
export default function Arguments(node: ArgsDefNode,
                                symtab: SymTab,
                              isMethod: boolean = false) {
    
    let result = "";

    // if method => ignore first parameter...
    let pos_offset = 0;
    let arg_offset = 0;

    if( isMethod ) {
        if( node.posonlyargs.length)
            ++pos_offset
        else
            ++arg_offset;
    }

    for(let i = pos_offset; i < node.posonlyargs.length; ++i)
        result += `${node.posonlyargs[i].arg}, `;

    for(let i = arg_offset; i < node.args.length; ++i)
        result += `_${node.args[i].arg}, `;

    if( node.args.length ) {
        // kw...
        result += "{";
        for( let i = arg_offset ; i < node.args.length; ++i)
            result += `${node.args[i].arg} = _${node.args[i].arg}, `;
        result += "} = $RB.getKW()";
    }

    return result;
}