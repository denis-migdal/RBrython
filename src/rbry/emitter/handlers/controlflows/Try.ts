import { TryNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Try(node: TryNode, ctx: EmitContext) {

    ctx.w`try{${node.body}}`;

    if( node.handlers.length > 0) {
        ctx.w`catch(_e_){${ctx.hm.BB()}`

        for(let i = 0; i < node.handlers.length; ++i) {

            // TODO: as cond.
            const except = node.handlers[i];

            if( i !== 0)
                ctx.w`else `;
            if( except.type !== undefined)
                ctx.w`if( isinstance(_e_, ${except.type}) )`;

            ctx.w`{`;

                if( except.name !== undefined)
                    ctx.w`${ctx.hm.BB()}var ${except.name} = _e_;${ctx.hm.BE()}`
                ctx.w_body(except.body);
            
            ctx.w`}`;


        }
    
        ctx.w`${ctx.hm.BE()}}`;
    }

    if( node.finalbody.length > 0)
        ctx.w`finally{${node.finalbody}}`;
}