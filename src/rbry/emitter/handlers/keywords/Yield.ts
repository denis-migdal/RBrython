import { YieldNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Yield(node: YieldNode, ctx: EmitContext) {
    ctx.w`yield ${node.value}`;
}