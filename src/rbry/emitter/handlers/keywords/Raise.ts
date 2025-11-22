import { RaiseNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Raise(node: RaiseNode, ctx: EmitContext) {
    return ctx.w`throw ${node.exc};`;
}