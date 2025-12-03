import { IfExpNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function If(node: IfExpNode, ctx: EmitContext) {
    ctx.w`( ${ctx.hm.bool(node.test)} ? ${node.body} : ${node.orelse} )`;
}