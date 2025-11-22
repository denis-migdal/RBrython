import { ReturnNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Return(node: ReturnNode, ctx: EmitContext) {
    return ctx.w`return ${node.value}`;
}