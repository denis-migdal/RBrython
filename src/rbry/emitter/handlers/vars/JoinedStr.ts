import { nodeType } from "../../../ast/";
import { FormattedValueNode, JoinedStrNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function JoinedStr(node: JoinedStrNode, ctx: EmitContext) {

    ctx.w_str("`");
    for(let i = 0; i < node.values.length; ++i) {
        const value = node.values[i];
        const type  = nodeType(value);

        if( type === "Constant") {
            ctx.w_str(value.value as string);
            continue;
        }

        const val = value as FormattedValueNode;

        if( val.format_spec === undefined ) {
            ctx.w`\${${value.value}}`;
            continue;
        }

        ctx.w`\${format(${value.value}, ${val.format_spec.values[0]})}`;
    }
    ctx.w_str("`");
}