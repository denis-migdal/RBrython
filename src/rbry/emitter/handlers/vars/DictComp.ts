import { DictCompNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function ListComp(node: DictCompNode, ctx: EmitContext) {

    console.warn(node);

    ctx.w`(function(){${ctx.hm.BB()}`;

    ctx.w`const _r_ = [];${ctx.hm.NL()}`

    for(let i = 0; i < node.generators.length; ++i) {
        const gen = node.generators[i];
        ctx.w`for(let ${gen.target} of ${gen.iter}){${ctx.hm.BB()}`;

        for(let j = 0; j < gen.ifs.length; ++j) {
            ctx.w`if(${gen.ifs[j]}){${ctx.hm.BB()}`;
        }
    }

    ctx.w`_r_.push([${node.key}, ${node.value}])`;

    for(let i = 0; i < node.generators.length; ++i) {
        ctx.w`${ctx.hm.BE()}}`;

        for(let j = 0; j < node.generators[i].ifs.length; ++j) {
            ctx.w`${ctx.hm.BE()}}`;
        }
    }

    ctx.w`${ctx.hm.NL()}return dict(_r_);`;

    ctx.w`${ctx.hm.BE()}})()`
}