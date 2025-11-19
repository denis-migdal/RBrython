import { ASTNode } from "@RBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function Lambda(node: ASTNode): string {
    let args = "";

    // @ts-ignore
    for(let i = 0; i < node.args.posonlyargs.length; ++i)
        // @ts-ignore
        args += node.args.posonlyargs[i].arg + ", ";

    // @ts-ignore
    return `(${args}) => { return ${node2js(node.body)}}`
}