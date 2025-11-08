import { NameNode } from "@SBrython/rbry/ast/types";

export default function Name(node: NameNode) {
    return node.id;
}