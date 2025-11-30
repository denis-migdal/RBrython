import { FunctionDefNode } from "@RBrython/rbry/ast/types";
import { TypedEntry } from "../../Walker";
import { FunctionType } from "../../types";

export default function FunctionDef(entry: TypedEntry<FunctionDefNode>) {
    (entry.symtab.typedSymbols ||= {})[entry.node.name] = {type: FunctionType};
}