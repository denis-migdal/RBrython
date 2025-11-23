import { ReturnNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Return(node: ReturnNode, ctx: EmitContext) {
    ctx.w`return ${node.value}`;
}