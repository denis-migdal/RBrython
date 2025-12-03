// interface
import op     from "./interface/op";
import uop    from "./interface/uop";
import call   from "./interface/call";
import mcall  from "./interface/mcall";
import assert from "./interface/assert";
import attr   from "./interface/attr";
import setattr from "./interface/setattr";
import getModule from "./interface/getModule";
import { getTmp, saveTmp, tmp, withTmp } from "./interface/tmp";
import { getKW, setKW } from "./interface/KW";

// @ts-ignore
const $RB = globalThis.$RB = {
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
    tmp,
    getTmp,
    saveTmp,
    withTmp,
    getModule,
    getModuleSync,
    getClass
}
export {$RB};

//TODO: corelib
import { getClass } from "./helpers/getClass";
import getModuleSync from "./interface/getModuleSync";

// @ts-ignore
/*
globalThis.abs = function( a: unknown) {
    const ka = getClass(a);
    return ka.prototype[`__abs__`].call(a);
}*/

// @ts-ignore
globalThis.range = function*(...args: bigint[]) {
    let beg = 0n;
    let end = args[0];
    let inc = 1n;

    if( args.length >= 2) {
        beg = args[0]
        end = args[1]

        if( args.length === 3)
            inc = args[2];
    }

    for(let i = beg; i < end; i+= inc)
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