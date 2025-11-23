
import { ForNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function For(node: ForNode, ctx: EmitContext) {
    ctx.w`for(${node.target} of ${node.iter}){${node.body}}`;
}