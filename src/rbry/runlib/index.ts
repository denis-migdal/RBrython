// interface
import op     from "./interface/op";
import uop    from "./interface/uop";
import call   from "./interface/call";
import mcall  from "./interface/mcall";
import assert from "./interface/assert";
import attr   from "./interface/attr";
import setattr from "./interface/setattr";
import getModule from "./interface/getModule";
import { getKW, setKW } from "./interface/KW";

// @ts-ignore
globalThis.$RB = {
    // interface
    op,
    uop,
    call,
    mcall,
    assert,
    attr,
    setattr,
    getKW,
    setKW,
    getModule
}

//TODO: corelib
import {NotImplemented} from "./tmp_corelib/NotImplemented";
import { getClass } from "./helpers/getClass";

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

// =====================================================

//TODO: as macro...
export const IVALUE = Symbol();

// @ts-ignore
globalThis.__JS_SET_IVALUE__ = (self, v) => self[IVALUE] = v;
// @ts-ignore
globalThis.__JS_GET_IVALUE__ = (self) => self[IVALUE];