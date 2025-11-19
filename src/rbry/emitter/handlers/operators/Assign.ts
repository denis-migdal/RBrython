import { AssignNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function Assign(node: AssignNode) {

    let res = "";

    //@ts-ignore
    const prefix = globalThis.inClass ? "static " : "var ";

    for(let i = 1; i < node.targets.length; ++i)
        res += `${prefix}${node2js(node.targets[i])};`;

    res += prefix + node2js(node.targets[0]) + " = ";
    for(let i = 1; i < node.targets.length; ++i)
        res += node2js(node.targets[i]) + " = ";

    return res + node2js(node.value);
}