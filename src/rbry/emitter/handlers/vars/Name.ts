import { NameNode } from "../../../ast/types";

export default function Name(node: NameNode) {
    return node.id;
}