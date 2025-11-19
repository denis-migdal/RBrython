import { UnaryOpNode } from "../../../ast/types";
import { node2js } from "../../node2js";
import { getOp } from "../../../ast/";

export default function(node: UnaryOpNode) {

    const a = node.operand;
    const op = getOp(node.op) as keyof typeof uops;

    const opname = uops[op];
    if( opname === undefined) 
        throw new Error(`UnaryOp ${op} not impl`);

    return `$RB.uop("${opname}", ${node2js(a)})`;
}

const uops = {
    Invert: "invert",
    USub: "neg",
    // pos

    // special:
    Not: "not", // use __len__ or __bool__
}