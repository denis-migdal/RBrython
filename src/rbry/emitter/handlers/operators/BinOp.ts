import { getOp } from "../../../ast/";
import { BinaryOpNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function(node: BinaryOpNode) {
    const a = node.left;
    const b = node.right;
    const op = getOp(node.op) as keyof typeof binops;

    const opname = binops[op];
    if( opname === undefined) 
        throw new Error(`BinOp ${op} not impl`);

    return `$RB.op(${node2js(a)}, "${opname}", ${node2js(b)})`;
}

export const binops = {
    Add : "add",
    Sub : "sub",
    Mult: "mul",
    Div : "div",
    Pow : "pow",
    Mod : "mod",
    // bits
    BitOr: "or",
    BitAnd: "and",
    LShift: "lshift",
    RShift: "rshift"
}