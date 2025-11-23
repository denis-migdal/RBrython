import { TryNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Try(node: TryNode, ctx: EmitContext) {
    ctx.w`try{${node.body}}catch{${node.handlers[0].body}}`;
}