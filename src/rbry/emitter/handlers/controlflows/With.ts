import { WithNode } from "@RBrython/rbry/ast/types";
import { EmitContext } from "../../EmitContext";

export default function With(node: WithNode, ctx: EmitContext) {
    
    ctx.w`{${ctx.hm.BB()}`;
    ctx.w`const _w_ = [${ctx.hm.BB()}`;
    for(let i = 0; i < node.items.length; ++i )
        ctx.w`${node.items[i].context_expr},${ctx.hm.NL()}`
    ctx.w`${ctx.hm.BE()}];${ctx.hm.NL()}`;

    for(let i = 0; i < node.items.length; ++i) {
        const r = node.items[i];
        if( r.optional_vars !== undefined)
            ctx.w`var ${r.optional_vars} = `;
        ctx.w`$RB.mcall(_w_[${i}], '__enter__');${ctx.hm.NL()}`
    }

    ctx.w`let _err_ = null;${ctx.hm.NL()}`

    ctx.w`try{${node.body}} catch(_e_) { _err_ = _e_ }${ctx.hm.NL()}`;
    ctx.w`finally {${ctx.hm.BB()}`

        ctx.w`let _et_ = null; let _ee_ = null; let _ex_ = null;${ctx.hm.NL()}`;

        ctx.w`if(_err_ !== null) {${ctx.hm.BB()}`;
            ctx.w`_et_ = 'type';${ctx.hm.NL()}`;
            ctx.w`_ee_ = 'exp';${ctx.hm.NL()}`;
            ctx.w`_ex_ = 'trace';`;
        ctx.w`${ctx.hm.BE()}}${ctx.hm.NL()}`;


    ctx.w`let _ok_ = true;${ctx.hm.NL()}`
    for(let i = node.items.length - 1; i >= 0; --i) {
        const r = node.items[i];
        ctx.w`_ok_ &&= $RB.mcall(_w_[${i}], '__exit__', _et_, _ee_, _ex_);${ctx.hm.NL()}`
    }
    ctx.w`if( _err_ !== null && ! _ok_ ) throw _err_;`;

    ctx.w`${ctx.hm.BE()}}${ctx.hm.BE()}}`;
    //TODO: leave...
    //TODO: exceptions
    // body
}