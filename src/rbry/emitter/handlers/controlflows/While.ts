import { WhileNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function While(node: WhileNode, ctx: EmitContext) {
    ctx.w`while(${node.test}){${node.body}}`;
}