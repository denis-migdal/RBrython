import { ASTNode } from "../../../ast/types";

export default function Import(node: ASTNode) {

    // @ts-ignore
    const module = node.names[0].name;

    if( module === "RBM" )
        return ""; // Brython macros...

    return `const ${module} = $RB.getModule("${module}")`;
}