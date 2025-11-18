import { ASTNode, AttributeNode, CallNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";
import { nodeType } from "@SBrython/rbry/ast";

export const macros: Record<string, (...args: ASTNode[]) => string> = {};

export default function Call(node: CallNode) {
    const f        = node.func;
    const args     = node.args;
    const keywords = node.keywords;

    // @ts-ignore
    if( f.id in macros)
        // @ts-ignore
        return macros[f.id]( ...node.args );

    //TODO: args parsing...
    let str = "";
    for(let i = 0; i < args.length; ++i)
        str += node2js(args[i]) + ", ";

    if( keywords.length ) {
        str += "$RB.setKW({";
            for( let i = 0; i < keywords.length; ++i)
                // @ts-ignore
                str += `${keywords[i].arg}: ${node2js(keywords[i].value)},`;
        str += "})";
    }    

    if( nodeType(f) === "Attribute") {
        const m = f as AttributeNode;
        return `$RB.mcall(${node2js(m.value)}, "${m.attr}", ${str} )`;
    }

    return `$RB.call(${node2js(f)}, ${str})`;
}