import { UnaryOpNode } from "../../../ast/types";
import { getOp } from "../../../ast/";
import { EmitContext } from "../../EmitContext";

export default function(node: UnaryOpNode, ctx: EmitContext) {

    const a = node.operand;
    const op = getOp(node.op) as keyof typeof uops | "Not";

    if( op === "Not") {
        ctx.w`! ${ctx.hm.bool(a)}`;
        return;
    }

    const opname = uops[op];
    if( opname === undefined) 
        throw new Error(`UnaryOp ${op} not impl`);

    ctx.w`$RB.uop("${opname}", ${a})`;
}

const uops = {
    Invert: "invert",
    USub  : "neg",
    UAdd  : "pos",
}