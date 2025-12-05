// interface
import op     from "./interface/op";
import uop    from "./interface/uop";
import call   from "./interface/call";
import mcall  from "./interface/mcall";
import assert from "./interface/assert";
import getModule from "./interface/getModule";
import getModuleSync from "./interface/getModuleSync";
import { getTmp, saveTmp, tmp, withTmp } from "./interface/tmp";
import { getKW, setKW } from "./interface/KW";
import { getClass } from "./helpers/getClass";
import _in from "./interface/in";
import getitem from "./interface/getitem";
import setitem from "./interface/setitem";
import delitem from "./interface/delitem";
import getattr from "./interface/getattr";
import delattr from "./interface/delattr";
import setattr from "./interface/setattr";

// @ts-ignore
const $RB = globalThis.$RB = {
    // interface
    op,
    uop,
    call,
    mcall,
    assert,
    getitem,
    setitem,
    delitem,
    getattr,
    setattr,
    delattr,
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