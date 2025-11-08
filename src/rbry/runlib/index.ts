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
    op,
    uop,
    call,
    mcall,
    assert,
    attr,
}


//TODO: corelib

import { int   } from "./tmp_corelib/int";
import { float } from "./tmp_corelib/float";
import { str   } from "./tmp_corelib/str";
import { _boolean } from "./tmp_corelib/boolean";
import { getClass } from "./helpers/getClass";

//TODO: __call__ on type...

// @ts-ignore
globalThis.str = str;
// @ts-ignore
globalThis.float = float;
// @ts-ignore
globalThis.int = int;

// @ts-ignore
globalThis.abs = function( a: unknown) {
    const ka = getClass(a);
    return ka.prototype[`__abs__`].call(a);
}

// @ts-ignore
globalThis.type = function(a: unknown) {
    return getClass(a); //TODO...
}