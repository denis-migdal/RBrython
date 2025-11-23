import { ClassDefNode, SymTab } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function ClassDef(node: ClassDefNode, ctx: EmitContext) {

    const name = node.name;
    const body = node.body;

    // JS cstr
    ctx.w`var ${name} = (() =>{
        function ${name}() {
            return Object.create(${name}.prototype);
        }
    `;

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

    ctx.w`
        return ${name};
    })();
    `;
}