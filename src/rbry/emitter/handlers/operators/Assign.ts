import { nodeType } from "@RBrython/rbry/ast";
import { AssignNode, AttributeNode, SymTab } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Assign(node: AssignNode, ctx: EmitContext) {

    let prefix = "var ";
    const type = nodeType(node.targets[0]);
    if( type === "Attribute" ) {
        const attr = node.targets[0] as AttributeNode;
        ctx.w`$RB.setattr(${attr.value}, "${attr.attr}", ${node.value})`;
        return;
    }

    for(let i = 1; i < node.targets.length; ++i)
        ctx.w`${prefix}${node.targets[i]};`;

    ctx.w`${prefix}${node.targets[0]} = `;
    for(let i = 1; i < node.targets.length; ++i)
        ctx.w`${node.targets[i]} = `;

    return ctx.w_node(node.value);
}