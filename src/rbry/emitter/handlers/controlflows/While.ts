import { WhileNode } from "@SBrython/rbry/ast/types";
import { node2js } from "../../node2js";
import Body from "../Body";

export default function While(node: WhileNode) {

    return `while(${node2js(node.test)}) {
        ${Body(node.body)}
    }`;

}