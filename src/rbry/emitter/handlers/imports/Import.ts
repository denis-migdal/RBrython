import { ImportNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Import(node: ImportNode, ctx: EmitContext) {

    for(let i = 0; i < node.names.length; ++i) {
        
        const module = node.names[i];

        const moduleName = module.name;

        if( moduleName === "RBM" )
            continue; // RBrython macros...

        let asname = module.asname;
        if( asname === undefined)
            asname = moduleName;

        const importfct = ctx.isTopLevel() && ! ctx.sync
                            ? "await $RB.getModule"
                            : "$RB.getModuleSync"
        
        ctx.w`const ${asname} = ${importfct}("${moduleName}")`;
    }
}