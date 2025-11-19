import { node2js } from "../../node2js";
import { nodeType } from "../../../ast";
import { ClassDefNode } from "../../../ast/types";

// @ts-ignore
globalThis.inCstrFct = false;

export default function ClassDef(node: ClassDefNode) {
    const name = node.name;
    const body = node.body;

    // dirty dirty h4ck... (we need a runner)
    let str = `globalThis.${name} = (() =>{
        function ${name}() {
            return Object.create(${name}.prototype);
        }
        const classname = ${name};
    `;

    // @ts-ignore
    const isH4ck = node.bases.length === 1 && ["number", "bigint", "boolean", "string"].includes(node.bases[0].id);

    if( !isH4ck && node.bases.length >= 1) {
        str += `${name}.prototype = Object.create(${node2js(node.bases[0])}.prototype);\n`;
    
        for(let i = 1; i < node.bases.length; ++i) {

            str += `Object.assign(${name}.prototype, ${node2js(node.bases[i])}.prototype);`;
        }

        str += `${name}.prototype.constructor = ${name};\n`;
    }

    for(let i = 0; i < body.length; ++i) {
        const type = nodeType(body[i]);
        if( type === "FunctionDef") {
            // @ts-ignore
            globalThis.inCstrFct = true;
            // @ts-ignore
            let prefix = body[i].name === "_"
                            ? ""
                            // @ts-ignore
                            : `${name}.prototype.${body[i].name} = `;
            
            str += `${prefix}${node2js(body[i])}
            `;
            // @ts-ignore
            globalThis.inCstrFct = false;
        }
    }

    str += `
        return ${name};
    })();
    `;

    return str;
}