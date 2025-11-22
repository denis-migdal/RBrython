import { MODE } from "../..";
import { NameNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Name(node: NameNode, ctx: EmitContext) {

    // h4ck
    if( node.id === "__debug__")
        return ctx.w`${ctx.mode === MODE.DEBUG}`;

    return ctx.w_str(node.id);
}