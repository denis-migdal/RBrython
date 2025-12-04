import { YieldNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function YieldFrom(node: YieldNode, ctx: EmitContext) {
    ctx.w`yield * ${node.value}`;
}