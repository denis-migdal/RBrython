import { nodeType } from "../../../ast/";
import { node2js } from "../../node2js";
import { JoinedStrNode } from "../../../ast/types";

export default function JoinedStr(node: JoinedStrNode) {

    console.warn(node);

    let res = "`";
    for(let i = 0; i < node.values.length; ++i) {
        const value = node.values[i];
        const type  = nodeType(value);

        if( type === "Constant")
            // @ts-ignore
            res += value.value;
        else {
            // @ts-ignore
            res += `\${${node2js(value.value)}}`;
        }
    }
    res += "`";
    return res;
}