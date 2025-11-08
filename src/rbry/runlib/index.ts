// @ts-nocheck

import { int } from "./int";
import { float } from "./float";
import { str } from "./str";
import { type } from "./type";
import { NotImplemented } from "./NotImplemented";
import { _boolean } from "./boolean";


export function getClass(o: unknown) {
    const typename = typeof o;

    if( typename === "function" ) {
        //TODO: is class ? is something else ?
        return type;
    }

    if( typename === "object" ) {
        return o.constructor;
    }

    return lit_types[typename];
}

const lit_types = {
    "bigint" : int,
    "number" : float,
    "string" : str,
    "boolean": _boolean
}

export function uop(op:string, a: unknown) {

    if( op === "not") {
        return ! a;
    }

    const ka = getClass(a);

    if( ka === undefined ) {
        console.warn(a, op);
        throw new Error("?")
    }

    let fct = ka.prototype[`__${op}__`];
    return fct.call(a);
}

const defaults = {
    eq: function(b) { console.warn("called", this, b); return this == b }
}

export function op(a: unknown, op: string, b: unknown) {
    const ka = getClass(a);

    if( ka === undefined ) {
        console.warn(a, op);
        throw new Error("?")
    }

    let fct = ka.prototype[`__${op}__`];

    if( fct === undefined ) {
        if( op === "ne" )
            return ! ka.prototype["__eq__"].call(a, b);
        if( op[0] === "i")
            fct = ka.prototype[`__${op.slice(1)}__`];
        if( fct === undefined)
            fct = defaults[op];
    }

    console.warn(a);
    let result = fct.call(a, b);
    if( result === NotImplemented) {

        const kb = getClass(b);
        if( kb === undefined ) {
            console.warn(b, "r" + op);
            throw new Error("?");
        }

        let fct = kb.prototype[`__r${op}__`];
        result = fct.call(b, a);
    }

    return result;
}

export function assert(cond: boolean) {
    if( ! cond )
        throw new Error(`Assertion failed`);
}

function isClass(_: unknown) {
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(_)?.prototype?.writable === false;
}
// + https://github.com/brython-dev/brython/issues/2513

//TODO args...
function call(a: (...args:unknown[]) => unknown, ...args: unknown[]) {

    let fct = a.__call__
    if( fct === undefined ) {
        fct = a;

        if( isClass(fct) )
            return new fct(...args);
    }


    //TODO: class instantiate...
    return fct(...args);
}

function mcall(o: unknown, name: string, ...args: unknown[]) {
    return o[name](...args);
}

export function attr(o: unknown, attr: string) {
    if( ! (attr in o) )
        return o.constructor[attr];
    return o[attr];
}

globalThis.$RB = {
    getClass,
    op,
    uop,
    call,
    mcall,
    assert,
    attr,
    globals: {}
}

// builtins symbols... ~> __call__ ?
globalThis.str = str;
globalThis.float = float;
globalThis.int = int;

globalThis.abs = function( a: unknown) {
    const ka = getClass(a);
    return ka.prototype[`__abs__`].call(a);
}
globalThis.type = function(a: unknown) {
    return getClass(a); //TODO...
}