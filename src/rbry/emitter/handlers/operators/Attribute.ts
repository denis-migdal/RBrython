import { AttributeNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function (node: AttributeNode) {
    return `$RB.attr(${node2js(node.value)}, "${node.attr}")`;
}