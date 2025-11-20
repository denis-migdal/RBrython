import Body from "../Body";
import { node2js } from "../../node2js";
import { CLASS, FunctionDefNode, SymTab } from "../../../ast/types";

export default function FunctionDef(node: FunctionDefNode, symtab: SymTab) {

    const isMethod = symtab.type === CLASS;

    const name = node.name;
    const body = node.body;

    const fsymtab = symtab.children.find( (e) => e.name === name)!;

    let result = "";
    if( symtab.type === CLASS )
        result += `${symtab.name}.prototype.${name} = `;

    for( let i = 0; i < node.decorator_list.length ; ++i )
        result += `${node2js(node.decorator_list[i])}(`;

    result += `function ${name}(`;

    result += node2js(node.args, symtab, isMethod);

    result += "){";

    if( isMethod ) {
        let selfname = "";
        if( node.args.posonlyargs.length > 0)
            selfname = node.args.posonlyargs[0].arg;
        else
            selfname = node.args.args[0].arg;
        result += `const ${selfname} = this;`; //TODO: prefer var renaming...
    }

    result += `
        ${Body(body, fsymtab)}
    }`;

    for( let i = 0; i < node.decorator_list.length ; ++i )
        result += ")";

    return result;
}