import { SubscriptNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Subscript(node: SubscriptNode, ctx: EmitContext) {
    ctx.w`$RB.getitem(${node.value}, ${node.slice})`;
}