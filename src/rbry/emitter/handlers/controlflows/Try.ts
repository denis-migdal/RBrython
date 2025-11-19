import { TryNode } from "../../../ast/types";
import Body from "../Body";

export default function Try(node: TryNode) {
    //TODO...
    return `try {
        ${Body(node.body)}
    } catch {
        ${  // @ts-ignore
            Body(node.handlers[0].body)
        }
    }`;
}