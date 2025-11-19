import { SymTab, WhileNode } from "../../../ast/types";
import { node2js } from "../../node2js";
import Body from "../Body";

export default function While(node: WhileNode, symtab: SymTab) {

    return `while( ${node2js(node.test)} ) {
        ${Body(node.body, symtab)}
    }`;

}