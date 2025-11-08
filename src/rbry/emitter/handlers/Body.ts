import { BodyNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../node2js";

export default function(body: BodyNode, _inClass = false) {

    let res = "";
    for(let i = 0; i < body.length; ++i) {
        //@ts-ignore
        globalThis.inClass = _inClass; //TODO: h4ck
        res += node2js(body[i]) + ";\n";
    }

    return res;
}