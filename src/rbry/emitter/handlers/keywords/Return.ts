import { ReturnNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function Return(node: ReturnNode) {
    return `return ${ node2js(node.value) }`;
}