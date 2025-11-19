import { AssertNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function Assert(node: AssertNode) {
    return `$RB.assert(${node2js(node.test)})`;
}