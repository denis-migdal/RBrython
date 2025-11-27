import { ImportFromNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function ImportFrom(node: ImportFromNode, ctx: EmitContext) {

    const module = node.module;

    if( module === "RBM" )
        return; // Brython macros...

    if( module === "types" || module === "typing")
        return; // ignore for now
    if( module === "functools") {
        console.warn("Import not implemented yet");
        return;
    }
    ctx.w`const {`;

    for(let i = 0; i < node.names.length; ++i) {
        const imported = node.names[i];
        let as = "";
        if( imported.asname !== undefined)
            as = `: ${imported.asname}`

        ctx.w`${imported.name}${as},`;
    }

    const importfct = ctx.isTopLevel() && ! ctx.sync
                            ? "await $RB.getModule"
                            : "$RB.getModuleSync"

    ctx.w`} = ${importfct}("${module}")`;
}
