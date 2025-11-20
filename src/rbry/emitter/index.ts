// quick h4ck (should move it).
import "../runlib";

import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import Body from "./handlers/Body";

const exportNodes = ["ClassDef", "FunctionDef"];
//TODO: Assign

export default function emit(ast: ParsedCode) {

    const bodyNode = ast.ast.body;

    const body   = Body(bodyNode, ast.symtable);
    const exports= new Array<string>();

    for(let i = 0; i < bodyNode.length; ++i) {
        // @ts-ignore
        const type: string = bodyNode[i].constructor.$name;
        if( exportNodes.includes(type) )
            // @ts-ignore
            exports.push(bodyNode[i].name);
    }

    return body+`\nconst __exported__ = {${exports.join(",")}}`;
}
