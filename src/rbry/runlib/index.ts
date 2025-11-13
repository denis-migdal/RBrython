// interface
import op     from "./interface/op";
import uop    from "./interface/uop";
import call   from "./interface/call";
import mcall  from "./interface/mcall";
import assert from "./interface/assert";
import attr   from "./interface/attr";

// @ts-ignore
globalThis.$RB = {
    // interface
    op,
    uop,
    call,
    mcall,
    assert,
    attr,
}


//TODO: corelib
import { getClass } from "./helpers/getClass";
import {NotImplemented} from "./tmp_corelib/NotImplemented";
import singledispatchmethod from "./tmp_corelib/singledispatchmethod";

// @ts-ignore
globalThis.__JS_LOG__ = (...args) => console.log(...args);

export const IVALUE = Symbol();

// @ts-ignore
globalThis.__JS_SET_IVALUE__ = (self, v) => self[IVALUE] = v;
// @ts-ignore
globalThis.__JS_GET_IVALUE__ = (self) => self[IVALUE];

const ops = { /* @ts-ignore */
    "==" : (a, b) => a ==  b,/* @ts-ignore */
    "===": (a, b) => a === b,/* @ts-ignore */
    "+"  : (a, b) => a +  b,/* @ts-ignore */
    "-"  : (a, b) => a -  b,/* @ts-ignore */
    "*"  : (a, b) => a *  b,/* @ts-ignore */
    "**" : (a, b) => a ** b,/* @ts-ignore */
    "/"  : (a, b) => a /  b,/* @ts-ignore */
    "%"  : (a, b) => a %  b,/* @ts-ignore */
    "|"  : (a, b) => a |  b,/* @ts-ignore */
    "&"  : (a, b) => a &  b,/* @ts-ignore */
    ">>" : (a, b) => a >> b,/* @ts-ignore */
    "<<" : (a, b) => a << b,/* @ts-ignore */
}

const uops = { /* @ts-ignore */
    "-": (a) => -a, /* @ts-ignore */
    "~": (a) => ~a, /* @ts-ignore */
    "!": (a) => !a,
}

// @ts-ignore
globalThis.__JS_RUN__ = function (code: string, ...args: any[]) {

    throw new Error("Currently, should not be called");
    
    // @ts-ignore
    return eval(code)(...args);
}

// @ts-ignore
globalThis.__JS_OP__ = function (...args: any[]) {

    throw new Error("Currently, should not be called");

    if(args.length === 2) { // unary op
        // @ts-ignore
        return uops[args[0]](args[1]);
    } // else binary op
    // @ts-ignore
    return ops[args[1]](args[0], args[2]);
}

// @ts-ignore
globalThis.__JS_AS_NUMBER__ = (o: unknown) => {
    if( o === "infinity" || o === "inf")
        return Number.POSITIVE_INFINITY
    if( o === "-infinity" || o === "-inf")
        return Number.NEGATIVE_INFINITY
    return Number( o );
}

// @ts-ignore
globalThis.__JS_AS_STRING__ = (o: unknown) => `${o}`;

// @ts-ignore
globalThis.singledispatchmethod = singledispatchmethod;

// @ts-ignore
globalThis.abs = function( a: unknown) {
    const ka = getClass(a);
    return ka.prototype[`__abs__`].call(a);
}

// @ts-ignore
globalThis.type = function(a: unknown) {
    return getClass(a); //TODO...
}

// @ts-ignore
globalThis.NotImplemented = NotImplemented;

// @ts-ignore
globalThis.range = function*(a: number) {
    for(let i = 0; i < a; ++i)
        yield i;
}

// @ts-ignore
globalThis.Exception = function(msg: string) {
    throw new Error(msg);
}

