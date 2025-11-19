import { ForNode, SymTab } from "../../../ast/types";
import { node2js } from "../../node2js";
import Body from "../Body";

export default function For(node: ForNode, symtab: SymTab) {
    return `for(${node2js(node.target)} of ${node2js(node.iter)}){
        ${Body(node.body, symtab)}
    }`;
}