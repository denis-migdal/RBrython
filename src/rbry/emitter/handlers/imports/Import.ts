import { ImportNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Import(node: ImportNode, ctx: EmitContext) {

    const module = node.names[0].name;

    if( module === "RBM" )
        return ""; // RBrython macros...

    return ctx.w`const ${module} = $RB.getModule("${module}")`;
}