import { getOp } from "../../../ast/";
import { BinaryOpNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function(node: BinaryOpNode, ctx: EmitContext) {
    const a = node.left;
    const b = node.right;
    const op = getOp(node.op) as keyof typeof binops;

    const opname = binops[op];
    if( opname === undefined) 
        throw new Error(`BinOp ${op} not impl`);

    ctx.w`$RB.op(${a}, "${opname}", ${b})`;
}

export const binops = {
    Add : "add",
    Sub : "sub",
    Mult: "mul",
    Div : "truediv",
    FloorDiv: "floordiv",
    Pow : "pow",
    Mod : "mod",
    // bits
    BitOr: "or",
    BitAnd: "and",
    BitXor: "xor",
    LShift: "lshift",
    RShift: "rshift"
}