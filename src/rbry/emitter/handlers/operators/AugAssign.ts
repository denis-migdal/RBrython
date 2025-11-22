import { AugAssignNode } from "../../../ast/types";
import { binops } from "./BinOp";
import { getOp } from "../../../ast/";
import { EmitContext } from "../../EmitContext";

export default function AugAssign(node: AugAssignNode, ctx: EmitContext) {
 
    const a  = node.target;
    const op = getOp(node.op) as keyof typeof binops;
    const b  = node.value;

    const opname = binops[op];
    if( opname === undefined) 
        throw new Error(`BinOp ${op} not impl`);

    return ctx.w`${a} = $RB.op(${a}, "i${opname}", ${b})`;   
}