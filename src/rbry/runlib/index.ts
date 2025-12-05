// interface
import op     from "./interface/op";
import uop    from "./interface/uop";
import call   from "./interface/call";
import mcall  from "./interface/mcall";
import assert from "./interface/assert";
import attr   from "./interface/attr";
import setattr from "./interface/setattr";
import getModule from "./interface/getModule";
import getModuleSync from "./interface/getModuleSync";
import { getTmp, saveTmp, tmp, withTmp } from "./interface/tmp";
import { getKW, setKW } from "./interface/KW";
import { getClass } from "./helpers/getClass";
import _in from "./interface/in";

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
    getClass,
    in: _in
}
export {$RB};

// =====================================================

//TODO: as macro...
export const IVALUE = Symbol();

// @ts-ignore
globalThis.__JS_SET_IVALUE__ = (self, v) => self[IVALUE] = v;
// @ts-ignore
globalThis.__JS_GET_IVALUE__ = (self) => self[IVALUE];