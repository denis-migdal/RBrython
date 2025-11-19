import { BodyNode, SymTab } from "../../ast/types";
import { node2js } from "../node2js";

export default function(body: BodyNode, symtab: SymTab) {

    let res = "";
    for(let i = 0; i < body.length; ++i)
        res += node2js(body[i], symtab) + ";\n";

    return res;
}