import { MatchNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Match(node: MatchNode, ctx: EmitContext) {

    ctx.w`{${ctx.hm.BB()}`; // we want a special scope for the match.

    //TODO: indent...

    ctx.w`const _s_ = ${node.subject};${ctx.hm.NL()}`

    for(let i = 0; i < node.cases.length -1; ++i) {
        if( i !== 0)
            ctx.w`else `;

        const c = node.cases[i];

        ctx.w`if( isinstance(_s_, ${c.pattern.cls.id}) ){${c.body}}`;
    }
    ctx.w`else {${node.cases[node.cases.length-1].body}}`;
    ctx.w`${ctx.hm.BE()}}`;
}