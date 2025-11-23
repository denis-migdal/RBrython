import { ImportNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Import(node: ImportNode, ctx: EmitContext) {

    const module = node.names[0].name;

    if( module === "RBM" )
        return; // RBrython macros...

    if( ctx.isTopLevel() && ! ctx.sync ) {
        ctx.w`const ${module} = await $RB.getModule("${module}")`;
        return
    }

    ctx.w`const ${module} = $RB.getModuleSync("${module}")`;
}