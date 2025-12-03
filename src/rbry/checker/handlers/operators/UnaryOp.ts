import { UnaryOpNode } from "@RBrython/rbry/ast/types";
import { TypedEntry } from "../../Walker";
import { getOp } from "@RBrython/rbry/ast";
import { BoolType } from "../../types";

export default function UnaryOp(entry: TypedEntry<UnaryOpNode>) {

    if( getOp(entry.node.op) === "Not")
        entry.node.result_type = { type: BoolType }
}