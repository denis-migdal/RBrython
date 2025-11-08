import { FunctionDefNode } from "@SBrython/rbry/ast/types";
import Body from "../Body";

export default function FunctionDef(node: FunctionDefNode) {
    const name = node.name;
    //const args = node.args;
    const body = node.body;

    // @ts-ignore
    let prefix = globalThis.inClass ? "" : "function ";

    return `${prefix}${name}() {
        const self = this;
        ${Body(body)}
    }`
}