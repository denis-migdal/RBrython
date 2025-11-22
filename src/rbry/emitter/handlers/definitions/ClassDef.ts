import { ClassDefNode, SymTab } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function ClassDef(node: ClassDefNode, ctx: EmitContext) {

    const name = node.name;
    const body = node.body;

    // JS cstr
    let str = ctx.w`var ${name} = (() =>{
        function ${name}() {
            return Object.create(${name}.prototype);
        }
    `;

    // inheritance

    // @ts-ignore
    const isH4ck = node.bases.length === 1 && ["number", "bigint", "boolean", "string"].includes(node.bases[0].id);

    if( !isH4ck && node.bases.length >= 1) {
        str += ctx.w`${name}.prototype = Object.create(${node.bases[0]}.prototype);\n`;
    
        for(let i = 1; i < node.bases.length; ++i) {
            str += ctx.w`Object.assign(${name}.prototype, ${node.bases[i]}.prototype);`;
        }

        str += ctx.w`${name}.prototype.constructor = ${name};\n`;
    }

    // body...
    str += ctx.w_body(body);

    str += ctx.w`
        return ${name};
    })();
    `;

    return str;
}