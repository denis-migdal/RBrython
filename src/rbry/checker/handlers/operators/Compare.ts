import { CompareNode } from "@RBrython/rbry/ast/types";
import { TypedEntry } from "../../Walker";
import { BoolType } from "../../types";

export default function Compare(entry: TypedEntry<CompareNode>) {
    entry.node.result_type = { type: BoolType }
}