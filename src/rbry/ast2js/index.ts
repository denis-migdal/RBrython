// @ts-nocheck

import { ASTNode } from "../bry_types";
import { AST } from "../py2ast";

import "../runtime";

export function ast2js(ast: AST) {
    return body2js(ast.ast.body);
}

function nodeType(node: ASTNode): string {
    // @ts-ignore
    return node.constructor.$name;
}

function body2js(nodes: ASTNode[], _inClass = false) {
    let res = "";
    for(let i = 0; i < nodes.length; ++i) {
        inClass = _inClass; // h4ck
        res += node2js(nodes[i]) + ";\n";
    }

    return res;
}

function node2js(node: ASTNode) {
    const type = nodeType(node)
    if( type === "Expr")
        // @ts-ignore
        return node2js(node.value);
    if( type === "Constant" ) {

        const type = typeof node.value;

        if( type === "object") {
            const qname = node.value.__class__.__qualname__
            if( qname === "float")
                return `${node.value.value}`;
            if( qname === "int")
                return `${node.value.value}n`;
        }
        if( type === "string") {
            return `"${node.value}"`;
        }
        if( type === "number") {
            // @ts-ignore
            return `${node.value}n`; // bigint
        }
        if( type === "boolean") {
            // @ts-ignore
            return `${node.value}`;
        }

        console.warn(node, type);
        throw new Error(`Unknown Cste ${type}`);
    }
    if( type === "Assert" ) {
        // @ts-ignore
        return `$RB.assert(${node2js(node.test)})`;
    }
    if( type === "UnaryOp") {
        const a = node.operand;
        const op = node.op.constructor.$name;

        const opname = uops[op];
        if( opname === undefined) 
            throw new Error(`UnaryOp ${op} not impl`);

        return `$RB.uop("${opname}", ${node2js(a)})`;
    }
    if( type === "BinOp") {
        const a = node.left;
        const b = node.right;
        const op = node.op.constructor.$name;
    
        const opname = binops[op];
        if( opname === undefined) 
            throw new Error(`BinOp ${op} not impl`);

        return `$RB.op(${node2js(a)}, "${opname}", ${node2js(b)})`;
    }
    if( type === "Compare") {

        const a = node.left;
        const op = node.ops[0].constructor.$name;
        const b  = node.comparators[0];
        if( op === 'Is' )
            return `${node2js(a)} === ${node2js(b)}`;
        const opname = cmpopts[op];
        if( opname === undefined) {
            console.warn(op);
            throw new Error(`CmpOp ${op} not impl`);
        }
        return `$RB.op(${node2js(a)}, "${opname}", ${node2js(b)})`;
    }
    if( type === "Name") {
        return node.id;
    }
    if( type === "Assign" ) {

        let res = inClass ? "static " : "";
        for(let i = 0; i < node.targets.length; ++i)
            res += node2js(node.targets[i]) + " = ";

        const b = node.value;

        return res + node2js(b);
    }
    if( type === "AugAssign") {

        const a = node.target;
        const op = node.op.constructor.$name;
        const b = node.value;


        const opname = binops[op];
        if( opname === undefined) 
            throw new Error(`BinOp ${op} not impl`);

        return `${node2js(a)} = $RB.op(${node2js(a)}, "i${opname}", ${node2js(b)})`;
    }
    if( type === "Call") {
        const f        = node.func;
        const args     = node.args;
        const keywords = node.keywords;

        //TODO: args parsing...
        let str = "";
        for(let i = 0; i < args.length; ++i)
            str += node2js(args[i]) + ", ";

        if( nodeType(f) === "Attribute")
            return `$RB.mcall(${node2js(f.value)}, "${f.attr}", ${str} )`;

        return `$RB.call(${node2js(f)}, ${str})`;
    }
    if( type === "ClassDef") {
        const name = node.name;
        const body = node.body;

        return `class ${name} {
            ${body2js(body, true)}
        }`;
    }
    if( type === "FunctionDef") {
        const name = node.name;
        const args = node.args;
        const body = node.body;

        let prefix = inClass ? "" : "function ";

        return `${prefix}${name}() {
            const self = this;
            ${body2js(body)}
        }`
    }
    if( type === "Return") {
        return `return ${ node2js(node.value) }`;
    }
    if( type === "Pass") {
        return "";
    }
    if( type === "Attribute") {
        return `$RB.attr(${node2js(node.value)}, "${node.attr}")`;
    }

    throw new Error("Unknown " + type);
}

let inClass = false;

const uops = {
    Invert: "invert",
    USub: "neg",
    // pos

    // special:
    Not: "not", // use __len__ or __bool__
}

const cmpopts = {
    Eq   : "eq",
    NotEq: "ne"
}

const binops = {
    Add : "add",
    Sub : "sub",
    Mult: "mul",
    Div : "div",
    Pow : "pow",
    Mod : "mod",
    // bits
    BitOr: "or",
    BitAnd: "and",
    LShift: "lshift",
    RShift: "rshift"
}