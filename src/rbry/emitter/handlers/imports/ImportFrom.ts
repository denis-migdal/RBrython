import { ASTNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function ImportFrom(node: ASTNode) {

    // @ts-ignore
    const module = node.module;

    if( module === "RBM" )
        return ""; // Brython macros...

    if( module === "types" || module === "typing")
        return ""; // ignore for now
    if( module === "functools") {
        console.warn("Import not implemented yet");
        return "";
    }
    let res = "const {";

    // @ts-ignore
    for(let i = 0; i < node.names.length; ++i)
        // @ts-ignore
        res += `${node.names[i].name},`;

    return res + `} = $RB.getModule("${module}")`;
}