import { DeleteNode, SubscriptNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";
import { nodeType } from "@RBrython/rbry/ast";

export default function Delete(node: DeleteNode, ctx: EmitContext) {

    for(let i = 0; i < node.targets.length; ++i) {
        const type = nodeType(node.targets[i]);
        if( type === "Subscript") {
            const snode = node.targets[i] as SubscriptNode;
            ctx.w`$RB.delitem(${snode.value}, ${snode.slice});${ctx.hm.NL}`
            continue;
        }
    }
    console.warn(node);
}