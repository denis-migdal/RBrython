import { getChildren, nodeType } from "@RBrython/rbry/ast";
import { ASTNode, BodyNode, FunctionDefNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";
import { node } from "webpack";

function hasYield(body: BodyNode) {

    const stack: ASTNode[] = [...body];

    let elem;
    while( elem = stack.pop() ) {

        if( nodeType(elem) === "Expr" )
            // @ts-ignore
            elem = elem.value;

        if( nodeType(elem) === "Yield" )
            return true;

        // can only be in a body.
        if( "body" in elem)
            // @ts-ignore
            stack.push(...elem.body);
    }

    return false;
}

export default function FunctionDef(node: FunctionDefNode, ctx: EmitContext) {

    const isMethod = ctx.isMethod();

    const name = node.name;
    const body = node.body;

    const genSym = hasYield(body) ? "*" : "";

    console.warn( hasYield(body) );

    if( isMethod )
        ctx.w`${ctx.getName(-1)}.prototype.${name} = `;

    // open decorator
    for( let i = 0; i < node.decorator_list.length ; ++i )
        ctx.w`${node.decorator_list[i]}(`;

    ctx.w`function ${genSym}${name} ${node.args}`;

    // start of the function/lambda is included in the arguments...

    ctx.w_body(body);
    ctx.w`}`;

    // close decorator
    for( let i = 0; i < node.decorator_list.length ; ++i )
        ctx.w`)`;
}