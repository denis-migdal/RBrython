import { ForNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";
import Body from "../Body";

export default function For(node: ForNode) {
    return `for(${node2js(node.target)} of ${node2js(node.iter)}){
        ${Body(node.body)}
    }`;
}