import { FunctionDefNode } from "@SBrython/rbry/ast/types";
import Body from "../Body";
import { node2js } from "../../node2js";
import { nodeType } from "@SBrython/rbry/ast";

export default function FunctionDef(node: FunctionDefNode) {
    const name = node.name;
    //const args = node.args;
    const body = node.body;

    // @ts-ignore
    let prefix = globalThis.inClass ? "" : "function ";

    let args = "";

    let i = 0;
    let arg_offset = 0;
    let self = "";
    // @ts-ignore
    if( globalThis.inClass || globalThis.inCstrFct ) {

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

    // vararg
    // kwonlyargs
    // kwarg
    //console.warn(node.args);


    let fct_str = `${prefix}${name}(${args}) {
        ${self}
        ${Body(body)}
    }`;

    if( node.decorator_list.length === 0 )
        return fct_str;

    const dnode = node.decorator_list[0];
    const type = nodeType(dnode);
    // hardcoded
    if( type === "Attribute") {
        // @ts-ignore
        const typehint = node.args.posonlyargs[1].annotation.id;

        let str = "";
        let prefix = "";
        let pprefix = "classname";

        // @ts-ignore
        if( globalThis.inClass ) {
            str += "static {\n";
            prefix = "function ";
            pprefix = "this";
        }

        str += `${pprefix}.prototype.${
                // @ts-ignore
                dnode.value.id
            }.register(
                ${prefix}${fct_str},
                "${typehint}"
            );
        `;

        // @ts-ignore
        if( globalThis.inClass )
            str += "}\n";

        return str;
    }

    // @ts-ignore
    if( globalThis.inClass ) {
        return `static {
            this.prototype.${name} = ${node2js(dnode)}(function ${fct_str});
        }`;
    }

    return `${node2js(dnode)}(${fct_str})`;
}