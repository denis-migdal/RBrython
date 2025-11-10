import { ClassDefNode } from "@SBrython/rbry/ast/types";
import { nodeType } from "@SBrython/rbry/ast";
import { node2js } from "../../node2js";

export default function ClassDef(node: ClassDefNode) {
    const name = node.name;
    const body = node.body;

    let str = `const ${name} = (() =>{
        function ${name}() {
            return Object.create(${name}.prototype);
        }
    `;

    for(let i = 0; i < body.length; ++i) {
        const type = nodeType(body[i]);
        if( type === "FunctionDef") {
            // @ts-ignore
            str += `${name}.prototype.${body[i].name} = ${node2js(body[i])}
            `;
        }
    }

    str += `
        return ${name};
    })();
    `;

    return str;

    /*return `class ${name} {
        ${Body(body, true)}
    }`;*/
}