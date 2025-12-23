import { TupleNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Tuple(node: TupleNode, ctx: EmitContext) {
    ctx.w`$RB.ro([`;

    for(let i = 0; i < node.elts.length; ++i) {
        ctx.w_node(node.elts[i]);
        ctx.w_str(', ');
    }

    ctx.w`])`;
}