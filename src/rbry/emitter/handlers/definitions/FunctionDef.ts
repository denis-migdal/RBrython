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

    let fct_str = `${prefix}${name}() {
        const self = this;
        ${Body(body)}
    }`;

    if( node.decorator_list.length === 0 )
        return fct_str;

    const dnode = node.decorator_list[0];
    const type = nodeType(dnode);
    // hardcoded
    if( type === "Attribute") {
        // @ts-ignore
        const typehint = node.args.args[1].annotation.id;

        return `static {
            this.prototype.${
                // @ts-ignore
                dnode.value.id
            }.register(
                function ${fct_str},
                "${typehint}"
            );
        }`;
    }

    // @ts-ignore
    if( globalThis.inClass ) {
        return `static {
            this.prototype.${name} = ${node2js(dnode)}(function ${fct_str});
        }`;
    }

    throw new Error("not implemented");
}