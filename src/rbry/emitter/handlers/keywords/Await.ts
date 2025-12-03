import { AwaitNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Await(node: AwaitNode, ctx: EmitContext) {
    ctx.w`await ${node.value}`;
}