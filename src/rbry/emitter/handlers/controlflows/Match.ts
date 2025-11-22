import { MatchNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function Match(node: MatchNode, ctx: EmitContext) {

    let result = ctx.w`{`; // we want a special scope for the match.
    //TODO: indent...

    result += ctx.w`const tname = type(${node.subject}).name;`

    for(let i = 0; i < node.cases.length -1; ++i) {
        if( i !== 0)
            result += ctx.w`else `;

        const c = node.cases[i];

        result += ctx.w`if( tname === "${c.pattern.cls.id}"){${c.body}}`;
    }
    result += ctx.w`else {${node.cases[node.cases.length-1].body}}`;
    result += ctx.w`}`;

    return result;
}