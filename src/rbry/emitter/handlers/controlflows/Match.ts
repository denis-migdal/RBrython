import { MatchNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Match(node: MatchNode, ctx: EmitContext) {

    ctx.w`{${ctx.BB}`; // we want a special scope for the match.

    //TODO: indent...

    ctx.w`const tname = type(${node.subject}).name;`

    for(let i = 0; i < node.cases.length -1; ++i) {
        if( i !== 0)
            ctx.w`else `;

        const c = node.cases[i];

        ctx.w`if( tname === "${c.pattern.cls.id}"){${c.body}}`;
    }
    ctx.w`else {${node.cases[node.cases.length-1].body}}`;
    ctx.w`${ctx.EB}}`;
}