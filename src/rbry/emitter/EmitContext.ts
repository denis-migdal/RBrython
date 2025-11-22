import { MODE } from ".";
import { isASTNode, nodeType } from "../ast";
import { ASTNode, CLASS, ClassDefNode, FUNCTION, FunctionDefNode, SymTab } from "../ast/types";
import Handlers from "./handlers";

export type Macro = (ctx: EmitContext, ...args: ASTNode[]) => string;

export class EmitContext {

    readonly macros: Record<string, Macro> = {};
    readonly mode;

    #symtabs;
    constructor(symtab: SymTab, mode: MODE, macros: Record<string, Macro>) {
        this.#symtabs = [symtab];
        this.mode     = mode;
        this.macros   = macros;
    }

    // a little h4cky
    getName(idx = 0) {
        return this.#symtabs[this.#symtabs.length-1+idx].name;
    }
    isMethod() {
        const last = this.#symtabs.length-1;

        if( this.#symtabs[last].type !== FUNCTION )
            return false;

        return this.#symtabs[last-1].type === CLASS;
    }

    get symtab() { return this.#symtabs[this.#symtabs.length-1]; }

    w(strings: TemplateStringsArray, ...exprs: any[]): string {

        let result = "";
        for(let i = 0; i < exprs.length; ++i) {
            result += strings[i];
            const e = exprs[i];
            if( isASTNode(e) )
                result += this.w_node(e)
            else if( Array.isArray(e) )
                result += this.w_body(e);
            else
                result += `${e}`;
        }

        result += strings[strings.length-1];

        return result;
    }

    w_str(str: string) {
        return str;
    }

    w_body(nodes: ASTNode[]) {
        let res = "";
        for(let i = 0; i < nodes.length; ++i)
            res += this.w_node(nodes[i]) + ";\n";

        return res;
    }

    w_node(node: ASTNode) {

        const type = nodeType(node) as keyof typeof Handlers;

        const handler = Handlers[type];
        if( handler === undefined) {
            console.warn(node);
            throw new Error(`Node type ${nodeType(node)} is unknown`);
        }

        const hasNewContext = type === "FunctionDef" || type === "ClassDef";

        if( hasNewContext )
            this.enter( (node as ClassDefNode|FunctionDefNode).name);

        const str = handler(node, this);

        if( hasNewContext )
            this.leave();

        return str;
    }

    // enter/leave.

    protected enter(name: string): SymTab {
        const symtab = this.symtab.children.find( (l) => l.name === name)!;
        this.#symtabs.push(symtab)
        return symtab;
    }
    protected leave() {
        this.#symtabs.pop();
    }
}