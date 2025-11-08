import { RaiseNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";

export default function Raise(node: RaiseNode) {
    return `throw ${node2js(node.exc)};`;
}