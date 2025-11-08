// quick h4ck (should move it).
import "../runlib";

import { AST } from "../ast/types";
import Body from "./handlers/Body";

export default function emit(ast: AST) {
    return Body(ast.ast.body);
}
