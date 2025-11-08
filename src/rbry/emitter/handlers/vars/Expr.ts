import { ExprNode } from "../../../ast/types";
import { node2js } from "../../node2js";

export default function Expr(node: ExprNode) {
    return node2js(node.value);
}