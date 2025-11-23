import { AttributeNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function (node: AttributeNode, ctx: EmitContext) {
    ctx.w`$RB.attr(${node.value}, "${node.attr}")`;
}