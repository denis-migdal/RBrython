import { AttributeNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function (node: AttributeNode, ctx: EmitContext) {
    return ctx.w`$RB.attr(${node.value}, "${node.attr}")`;
}