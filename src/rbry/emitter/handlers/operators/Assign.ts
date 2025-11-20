import { nodeType } from "@RBrython/rbry/ast";
import { AssignNode, SymTab } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function Assign(node: AssignNode, symtab: SymTab) {

    let res = "";

    let prefix = "var ";
    const type = nodeType(node.targets[0]);
    if( type === "Attribute" )
        // @ts-ignore
        return `$RB.setattr(${node2js(node.targets[0].value)}, "${node.targets[0].attr}", ${node2js(node.value)})`;

    for(let i = 1; i < node.targets.length; ++i)
        res += `${prefix}${node2js(node.targets[i])};`;

    res += prefix + node2js(node.targets[0]) + " = ";
    for(let i = 1; i < node.targets.length; ++i)
        res += node2js(node.targets[i]) + " = ";

    return res + node2js(node.value);
}