import { ASTNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function Import(node: ASTNode) {
    // @ts-ignore
    return `const ${node.names[0].name} = $RB.getModule("${node.names[0].name}")`;
}