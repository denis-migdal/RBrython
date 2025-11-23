import { RaiseNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Raise(node: RaiseNode, ctx: EmitContext) {
    ctx.w`throw ${node.exc};`;
}