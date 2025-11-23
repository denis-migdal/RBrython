import { ImportFromNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function ImportFrom(node: ImportFromNode, ctx: EmitContext) {

    const module = node.module;

    if( module === "RBM" )
        return ""; // Brython macros...

    if( module === "types" || module === "typing")
        return ""; // ignore for now
    if( module === "functools") {
        console.warn("Import not implemented yet");
        return "";
    }
    let res = ctx.w`const {`;

    for(let i = 0; i < node.names.length; ++i)
        res += ctx.w`${node.names[i].name},`;

    if( ctx.isTopLevel() && ! ctx.sync )
        return  res + ctx.w`} = await $RB.getModule("${module}")`;

    return res + ctx.w`} = $RB.getModuleSync("${module}")`;
}