import { IfNode } from "../../../ast/types";
import { nodeType } from "../../../ast/";
import { EmitContext } from "../../EmitContext";

export default function If(node: IfNode, ctx: EmitContext) {

    let str = ctx.w`if( ${node.test} ){${node.body}}`;

    for(let i = 0; i < node.orelse.length; ++i) {
        const snode = node.orelse[i];
        const type = nodeType(snode);

        if( type === "If")
            str += ctx.w`else ${snode}`;  // if node (else is prefix)
        else
            str += ctx.w`else{${snode}}`; // a body I guess ?
    }

    return str;
}