import "./helpers/load_overridden_types"; // prevents circular dependencies.

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
    lit,
    op,
    uop,
    call,
    mcall,
    assert,
    attr,
}


//TODO: corelib

import { float } from "./tmp_corelib/float";
import { str   } from "./tmp_corelib/str";
import { _boolean } from "./tmp_corelib/boolean";
import { getClass } from "./helpers/getClass";
import {NotImplemented} from "./tmp_corelib/NotImplemented";
import singledispatchmethod from "./tmp_corelib/singledispatchmethod";
import lit from "./interface/lit";

//TODO: __call__ on type...

// @ts-ignore
globalThis.__JS_LOG__ = (...args) => console.log(...args);

const HVALUE = Symbol();

// @ts-ignore
globalThis.__JS_SET_HVALUE__ = (self, v) => self[HVALUE] = v;

// @ts-ignore
globalThis.__JS_GET_HVALUE__ = (self, v) => self[HVALUE];

// @ts-ignore
globalThis.__JS_ADD__ = (a, b) => {
    console.warn(a,b);
    return a+b
};


// @ts-ignore
globalThis.str = str;
// @ts-ignore
globalThis.float = float;

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