import { node2js } from "../../node2js";
import { ClassDefNode, SymTab } from "../../../ast/types";
import Body from "../Body";

export default function ClassDef(node: ClassDefNode, symtab: SymTab) {

    const name = node.name;
    const body = node.body;

    const csymtab = symtab.children.find( (e) => e.name === name)!;

    // JS cstr
    let str = `globalThis.${name} = (() =>{
        function ${name}() {
            return Object.create(${name}.prototype);
        }
    `;

    // inheritance

    // @ts-ignore
    const isH4ck = node.bases.length === 1 && ["number", "bigint", "boolean", "string"].includes(node.bases[0].id);

    if( !isH4ck && node.bases.length >= 1) {
        str += `${name}.prototype = Object.create(${node2js(node.bases[0])}.prototype);\n`;
    
        for(let i = 1; i < node.bases.length; ++i) {

            str += `Object.assign(${name}.prototype, ${node2js(node.bases[i])}.prototype);`;
        }

        str += `${name}.prototype.constructor = ${name};\n`;
    }

    // body...
    str += Body(body, csymtab);

    str += `
        return ${name};
    })();
    `;

    return str;
}