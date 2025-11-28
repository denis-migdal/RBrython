import { nodeType } from "@RBrython/rbry/ast";
import { AssignNode, AttributeNode } from "../../../ast/types";
import { EmitContext, LOCAL_VAR } from "../../EmitContext";

export default function Assign(node: AssignNode, ctx: EmitContext) {

    const type = nodeType(node.targets[0]);
    if( type === "Attribute" ) {
        const attr = node.targets[0] as AttributeNode;
        ctx.w`$RB.setattr(${attr.value}, "${attr.attr}", ${node.value})`;
        return;
    }

    console.warn( ctx.getName(), node.targets[0].id, ctx.getScope(node.targets[0].id).toString(2).padStart(15, " ") )

    for(let i = 1; i < node.targets.length; ++i)
        // @ts-ignore
        if( ctx.getScope(node.targets[i].id) & LOCAL_VAR || ctx.isTopLevel() )
            ctx.w`var ${node.targets[i]};`;

    // @ts-ignore
    if( ctx.getScope(node.targets[0].id) & LOCAL_VAR || ctx.isTopLevel() )
        ctx.w`var `;

    for(let i = 0; i < node.targets.length; ++i)
        ctx.w`${node.targets[i]} = `;

    return ctx.w_node(node.value);
}