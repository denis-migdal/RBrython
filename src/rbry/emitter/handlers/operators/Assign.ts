import { AssignNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function Assign(node: AssignNode) {
    //@ts-ignore
    let res = globalThis.inClass ? "static " : "";
    for(let i = 0; i < node.targets.length; ++i)
        res += node2js(node.targets[i]) + " = ";

    return res + node2js(node.value);
}