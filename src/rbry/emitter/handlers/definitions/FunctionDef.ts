import { FunctionDefNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function FunctionDef(node: FunctionDefNode, ctx: EmitContext) {

    const isMethod = ctx.isMethod();

    const name = node.name;
    const body = node.body;

    if( isMethod )
        ctx.w`${ctx.getName(-1)}.prototype.${name} = `;

    // open decorator
    for( let i = 0; i < node.decorator_list.length ; ++i )
        ctx.w`${node.decorator_list[i]}(`;

    ctx.w`function ${name} ${node.args}`;

    // start of the function/lambda is included in the arguments...

    ctx.w_body(body);
    ctx.w`}`;

    // close decorator
    for( let i = 0; i < node.decorator_list.length ; ++i )
        ctx.w`)`;
}