import { LambdaDefNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Lambda(node: LambdaDefNode, ctx: EmitContext){
    ctx.w`function ${node.args} return ${node.body}}`; // shouldn't have many lines...
}