import { nodeType } from "../../../ast/";
import { JoinedStrNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function JoinedStr(node: JoinedStrNode, ctx: EmitContext) {

    let res = ctx.w_str("`");
    for(let i = 0; i < node.values.length; ++i) {
        const value = node.values[i];
        const type  = nodeType(value);

        if( type === "Constant")
            res += ctx.w_str(value.value as string);
        else
            res += ctx.w`\${${value.value}}`;
    }
    res += ctx.w_str("`");
    return res;
}