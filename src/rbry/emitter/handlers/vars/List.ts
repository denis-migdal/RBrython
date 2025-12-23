import { ListNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function List(node: ListNode, ctx: EmitContext) {
    
    ctx.w`[`;

    for(let i = 0; i < node.elts.length; ++i) {
        ctx.w_node(node.elts[i]);
        ctx.w_str(', ');
    }

    ctx.w`]`;
}