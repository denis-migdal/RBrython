import { MODE } from ".";
import { isASTNode, nodeType } from "../ast";
import { ASTNode, CLASS, ClassDefNode, FUNCTION, FunctionDefNode, SymTab } from "../ast/types";
import Handlers from "./handlers";

export type Macro = (ctx: EmitContext, ...args: ASTNode[]) => void;

export class EmitContext {

    readonly macros: Record<string, Macro> = {};
    readonly mode;
    readonly sync;

    jscode: string = "";

    #symtabs;
    constructor(symtab: SymTab, mode: MODE, macros: Record<string, Macro>, sync: boolean) {
        this.#symtabs = [symtab];
        this.mode     = mode;
        this.macros   = macros;
        this.sync     = sync;
    }

    // a little h4cky
    getName(idx = 0) {
        return this.#symtabs[this.#symtabs.length-1+idx].name;
    }
    isTopLevel() {
        return this.#symtabs.length === 1;
    }
    isMethod() {
        const last = this.#symtabs.length-1;

        if( this.#symtabs[last].type !== FUNCTION )
            return false;

        return this.#symtabs[last-1].type === CLASS;
    }

    get symtab() { return this.#symtabs[this.#symtabs.length-1]; }

    w(strings: TemplateStringsArray, ...exprs: any[]) {

        for(let i = 0; i < exprs.length; ++i) {
            this.w_str(strings[i]);

            const e = exprs[i];
            if( e === this.BB) {
                ++this.indent_level;
                this.w_line();
            } else if (e === this.EB) {
                --this.indent_level;
                this.w_line();
            }  else if (e === this.NL) {
                this.w_line();
            } else if( isASTNode(e) )
                this.w_node(e)
            else if( Array.isArray(e) )
                this.w_body(e);
            else
                this.jscode += `${e}`;
        }

        this.w_str(strings[strings.length-1]);
    }

    w_str(str: string) {
        if( str.includes("\n") )
            throw new Error("Break line !");
        return this.jscode += str;
    }

    indent_level = 0;

    w_line() {
        this.jscode += "\n" + "  ".repeat(this.indent_level);
    }

    readonly NL = Symbol();
    readonly BB = Symbol();
    readonly EB = Symbol();

    w_body(nodes: ASTNode[]) {

        if( nodes.length === 0)
            return;

        ++this.indent_level;

        this.w_line();

        this.w_node(nodes[0]);

        for(let i = 1; i < nodes.length; ++i) {
            this.w_line();
            this.w_node(nodes[i]);
        }
        --this.indent_level;
        this.w_line();
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

        node.js_start = this.jscode.length;
        handler(node, this);
        node.js_end   = this.jscode.length;

        if( hasNewContext )
            this.leave();
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