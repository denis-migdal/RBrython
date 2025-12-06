import { MODE } from ".";
import { isASTNode, nodeType } from "../ast";
import { ASTNode, CLASS, ClassDefNode, FUNCTION, FunctionDefNode, SymTab } from "../ast/types";
import { HMacros } from "../optimizers";
import { Handlers } from "./handlers";
import hmacros from "./hmacros/list";

export type Macro = (ctx: EmitContext, ...args: ASTNode[]) => void;

export const LOCAL_VAR = 0x1000;

type EmitContextOpts = {
    opti: {
        handlers: Handlers,
        hmacros : HMacros
    }
    mode: MODE,
    sync: boolean
}

export class EmitContext {

    readonly macros : Record<string, Macro> = {};
    readonly hm     : typeof hmacros;
    readonly mode;
    readonly sync;

    readonly handlers;

    jscode: string = "";

    #symtabs;
    constructor({
                    opti: {
                        handlers,
                        hmacros,
                    },
                    mode,
                    sync,
                }: EmitContextOpts,
                
                macros  : Record<string, Macro>,
                symtab  : SymTab) {

        this.handlers = handlers;
        this.#symtabs = [symtab];
        this.mode     = mode;
        this.macros   = macros;
        this.hm       = hmacros as any;
        this.sync     = sync;
    }

    getScope(name: string) {
        return this.symtab.symbols.$strings[name];
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
            if( typeof e === "function") // HMacro
                e(this);
            else if( isASTNode(e) )
                this.w_node(e)
            else if( Array.isArray(e) )
                this.w_body(e);
            else
                this.jscode += `${e}`;
        }

        this.w_str(strings[strings.length-1]);
    }

    w_str(str: string) {
        //if( str.includes("\n") )
        //    throw new Error("Break line !");
        return this.jscode += str;
    }

    indent_level = 0;

    w_line() {
        const nl = "\n" + "  ".repeat(this.indent_level);
        if( ! this.jscode.endsWith(nl) )
            this.jscode += nl;
    }

    w_body(nodes: ASTNode[]) {

        if( nodes.length === 0)
            return;

        if( nodes.length === 1 && nodeType(nodes[0]) === "Pass")
            return;

        ++this.indent_level;

        for(let i = 0; i < nodes.length; ++i) {
            this.w_line();
            this.w_node(nodes[i]);
            this.w_str(";");
        }
        --this.indent_level;
        this.w_line();
    }

    w_node(node: ASTNode) {

        const type = nodeType(node);

        const handler = this.handlers[type];
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