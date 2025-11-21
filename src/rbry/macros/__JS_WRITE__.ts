import { ASTNode } from "../ast/types";

export default function __JS_WRITE__(code: ASTNode) {
    // @ts-ignore
    return code.value; //TODO: improve
}