// quick h4ck (should move it).
import "../runlib";

import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import Body from "./handlers/Body";

export default function emit(ast: ParsedCode) {
    return Body(ast.ast.body);
}
