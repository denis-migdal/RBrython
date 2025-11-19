import { AugAssignNode } from "../../../ast/types";
import { node2js } from "../../node2js";
import { binops } from "./BinOp";
import { getOp } from "../../../ast/";

export default function AugAssign(node: AugAssignNode) {
 
    const a  = node.target;
    const op = getOp(node.op) as keyof typeof binops;
    const b  = node.value;

    const opname = binops[op];
    if( opname === undefined) 
        throw new Error(`BinOp ${op} not impl`);

    return `${node2js(a)} = $RB.op(${node2js(a)}, "i${opname}", ${node2js(b)})`;   
}