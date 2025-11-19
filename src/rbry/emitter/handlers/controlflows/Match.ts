import { ASTNode } from "@RBrython/rbry/ast/types";
import { node2js } from "../../node2js";
import Body from "../Body";

export default function Match(node: ASTNode) {

    let result = "{";

    // @ts-ignore
    result += `const tname = type(${node2js(node.subject)}).name;`

    // @ts-ignore
    for(let i = 0; i < node.cases.length -1; ++i) {
        if( i !== 0)
            result += "else ";
        // @ts-ignore
        result += `if( tname === "${node.cases[i].pattern.cls.id}") {
            ${  // @ts-ignore
                Body(node.cases[i].body)}
        }`;
    }
    result += `else {
            ${  // @ts-ignore
                Body(node.cases[node.cases.length-1].body)}
    }`;

    result += "}";
    
    return result;
}