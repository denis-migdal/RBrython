import { NameNode } from "../../../ast/types";

export default function Name(node: NameNode) {

    // h4ck
    if( node.id === "__debug__")
        // @ts-ignore
        return `${globalThis.mode === MODE.DEBUG}`;

    return node.id;
}