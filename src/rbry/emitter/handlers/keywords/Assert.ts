import { MODE } from "../..";
import { AssertNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function Assert(node: AssertNode) {

    // @ts-ignore
    if( globalThis.mode === MODE.PROD )
        return "";

    return `$RB.assert(${node2js(node.test)})`;
}