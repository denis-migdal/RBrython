import { ClassDefNode } from "@SBrython/rbry/ast/types";
import Body from "../Body";

export default function ClassDef(node: ClassDefNode) {
    const name = node.name;
    const body = node.body;

    return `class ${name} {
        ${Body(body, true)}
    }`;
}