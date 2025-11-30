import { ClassDefNode, SymTab } from "../../../ast/types";
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
        ctx.w`${name}.prototype.__new__ = function __new__(...args) {${ctx.hm.BB()}`
            ctx.w`return Object.create(${name}.prototype)`;
        ctx.w`${ctx.hm.BE()}}${ctx.hm.BE()}`;

    // inheritance

    // @ts-ignore
    const isH4ck = node.bases.length === 1 && ["number", "bigint", "boolean", "string"].includes(node.bases[0].id);

    if( !isH4ck && node.bases.length >= 1) {
        ctx.w`${name}.prototype = Object.create(${node.bases[0]}.prototype);\n`;
    
        for(let i = 1; i < node.bases.length; ++i) {
            ctx.w`Object.assign(${name}.prototype, ${node.bases[i]}.prototype);`;
        }

        ctx.w`${name}.prototype.constructor = ${name};\n`;
    }

    // body...
    ctx.w_body(body);

    ctx.w`${ctx.hm.BB()}return ${name};${ctx.hm.BE()}})();`;
}