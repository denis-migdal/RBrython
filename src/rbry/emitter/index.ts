// quick h4ck (should move it).
import "../runlib";
import "./handlers/list"; // ensure Handlers are loaded.

import { ParsedCode } from "../ast/types";
import Body from "./handlers/Body";

const exportNodes = ["ClassDef", "FunctionDef"];
//TODO: Assign

export abstract class Emitter {
    abstract emit(parsed: ParsedCode): string;
}

export default class RBrythonEmitter extends Emitter {

    emit(parsed: ParsedCode) {

        const bodyNode = parsed.ast.body;

        const body   = Body(bodyNode, parsed.symtable);
        const exports= this.extractExportedSymbols(parsed);

        console.warn(exports);

        return `${body}\nconst __exported__ = {${exports.join(",")}}`;
    }

    private extractExportedSymbols(parsed: ParsedCode) {
        
        const symbols = parsed.symtable.symbols.$strings
        return Object.keys(symbols)
                     .filter( k => symbols[k] === 4098); // magic value
    }
}
