import { DictNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function List(node: DictNode, ctx: EmitContext) {
    
    ctx.w`dict([`;

    for(let i = 0; i < node.keys.length; ++i) {
        ctx.w`[${node.keys[i]}, ${node.values[i]}], `
    }

    ctx.w`])`;
}