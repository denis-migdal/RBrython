import { SymTab, TryNode } from "../../../ast/types";
import Body from "../Body";

export default function Try(node: TryNode, symtab: SymTab) {
    //TODO...
    return `try {
        ${Body(node.body, symtab)}
    } catch {
        ${  // @ts-ignore
            Body(node.handlers[0].body, symtab)
        }
    }`;
}