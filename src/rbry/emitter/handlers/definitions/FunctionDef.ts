import { FunctionDefNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function FunctionDef(node: FunctionDefNode, ctx: EmitContext) {

    const isMethod = ctx.isMethod();

    const name = node.name;
    const body = node.body;

    let result = "";
    if( isMethod )
        result += ctx.w`${ctx.getName(-1)}.prototype.${name} = `;

    // open decorator
    for( let i = 0; i < node.decorator_list.length ; ++i )
        result += ctx.w`${node.decorator_list[i]}(`;

    result += ctx.w`function ${name}(${node.args}){`;

    //TODO: prefer var renaming...
    if( isMethod ) {
        let selfname = "";
        if( node.args.posonlyargs.length > 0)
            selfname = node.args.posonlyargs[0].arg;
        else
            selfname = node.args.args[0].arg;
        result += ctx.w`const ${selfname} = this;`;
    }

    result += ctx.w_body(body);
    result += ctx.w`}`;

    // close decorator
    for( let i = 0; i < node.decorator_list.length ; ++i )
        result += ctx.w`)`;

    return result;
}