import Body from "../Body";
import { node2js } from "../../node2js";
import { CLASS, FunctionDefNode, SymTab } from "../../../ast/types";

export default function FunctionDef(node: FunctionDefNode, symtab: SymTab) {

    const name = node.name;
    const body = node.body;

    const fsymtab = symtab.children.find( (e) => e.name === name)!;


    let result = "";
    if( symtab.type === CLASS )
        result += `${symtab.name}.prototype.${name} = `;

    for( let i = 0; i < node.decorator_list.length ; ++i )
        result += `${node2js(node.decorator_list[i])}(`;

    result += `function ${name}(`;

    //TODO: move out args + use in lambda.
    let args = "";

    let i = 0;
    let arg_offset = 0;
    let self = "";

    if( symtab.type === CLASS ) { // first arg is self.

        let selfname = "";
        if( node.args.posonlyargs.length)
            // @ts-ignore
            selfname = node.args.posonlyargs[0].arg;
        else {
            // @ts-ignore
            selfname = node.args.args[0].arg
            ++arg_offset;
        }

        // @ts-ignore'
        self = `const ${selfname} = this;`;
        ++i;
    }

    for( ; i < node.args.posonlyargs.length; ++i) {
        //console.warn( node.args.posonlyargs[i] );
        //TODO:
        //args += node2js(node.args.posonlyargs[i]) + ", ";
        // @ts-ignore
        args += `${node.args.posonlyargs[i].arg}, `;
    }
    i = arg_offset;
    for( ; i < node.args.args.length; ++i) {
        //console.warn( node.args.posonlyargs[i] );
        //TODO:
        //args += node2js(node.args.posonlyargs[i]) + ", ";
        // @ts-ignore
        args += `_${node.args.args[i].arg}, `;
    }
    if( node.args.args.length ) {
        // kw...
        args += "{";
        for( let i = arg_offset ; i < node.args.args.length; ++i) {
            // @ts-ignore
            args += `${node.args.args[i].arg} = _${node.args.args[i].arg}, `;
        }
        args += "} = $RB.getKW()";
    }
    result += args; //TODO...

    // vararg
    // kwonlyargs
    // kwarg
    //console.warn(node.args);

    result += `){
        ${self}
        ${Body(body, fsymtab)}
    }`;

    for( let i = 0; i < node.decorator_list.length ; ++i )
        result += ")";

    return result;
}