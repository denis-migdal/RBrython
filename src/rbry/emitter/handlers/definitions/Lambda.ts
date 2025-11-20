import { LambdaDefNode, SymTab } from "@RBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function Lambda(node: LambdaDefNode, symtab: SymTab): string {
    
    const args = node2js(node.args, symtab);

    return `(${args}) => { return ${node2js(node.body)}}`
}