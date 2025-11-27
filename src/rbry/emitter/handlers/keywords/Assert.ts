import { MODE } from "../..";
import { AssertNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Assert(node: AssertNode, ctx: EmitContext) {

    if( ctx.mode === MODE.PROD )
        return;

    ctx.w`$RB.assert(bool(${node.test}), ${node.msg})`;
}