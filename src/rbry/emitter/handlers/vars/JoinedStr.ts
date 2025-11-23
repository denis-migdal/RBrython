import { nodeType } from "../../../ast/";
import { JoinedStrNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function JoinedStr(node: JoinedStrNode, ctx: EmitContext) {

    ctx.w_str("`");
    for(let i = 0; i < node.values.length; ++i) {
        const value = node.values[i];
        const type  = nodeType(value);

        if( type === "Constant")
            ctx.w_str(value.value as string);
        else
            ctx.w`\${${value.value}}`;
    }
    ctx.w_str("`");
}