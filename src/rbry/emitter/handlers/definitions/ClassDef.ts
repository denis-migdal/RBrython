import { ASTNode, ClassDefNode, SymTab } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function ClassDef(node: ClassDefNode, ctx: EmitContext) {

    const name = node.name;
    const body = node.body;

    // JS cstr
    ctx.w`var ${name} = (() =>{${ctx.hm.BB()}`
        ctx.w`function ${name}(...args) {${ctx.hm.BB()}`
            ctx.w`return type.prototype.__call__.call(${name}, ...args)`;
            //ctx.w`return Object.create(${name}.prototype);`
        ctx.w`${ctx.hm.BE()}}${ctx.hm.NL()}`

    // inheritance
    let bases: (ASTNode|string)[] = node.bases;

    // @ts-ignore
    const isH4ck = bases.length === 1 && ["number", "bigint", "boolean", "string", "obj"].includes(bases[0].id);

    if( isH4ck )
        bases = bases.slice(1);

    if( bases.length === 0 )
        bases = ["object"];

    // avoid auto-inheritance.
    if( name !== "object" ) {
        ctx.w`${name}.prototype = Object.create(${bases[0]}.prototype);${ctx.hm.NL()}`;

        for(let i = 1; i < bases.length; ++i) {
            ctx.w`Object.assign(${name}.prototype, ${bases[i]}.prototype);${ctx.hm.NL()}`;
        }
    
        ctx.w`${name}.prototype.constructor = ${name};`;
    }

    ctx.w`${ctx.hm.BE()}`;

    // body...
    ctx.w_body(body);

    ctx.w`${ctx.hm.BB()}return ${name};${ctx.hm.BE()}})()`;
}