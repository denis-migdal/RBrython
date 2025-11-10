import { IfNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";
import Body from "../Body";
import { nodeType } from "@SBrython/rbry/ast";

export default function If(node: IfNode) {

    let str = `if( __JS_GET_IVALUE__(${node2js(node.test)}) ) {
        ${ Body(node.body) }
    }`;

    for(let i = 0; i < node.orelse.length; ++i) {
        const snode = node.orelse[i];
        const type = nodeType(snode);

        if( type === "If")
            str += "else " + node2js(snode);
        else
            str += `else { ${node2js(snode)} }`;
    }

    return str;
}