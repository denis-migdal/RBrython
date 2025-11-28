import { getClass } from "../helpers/getClass";

// @ts-ignore
const NotImplemented = globalThis.NotImplemented = Symbol();

export default function op(a: unknown, op: string, b: unknown) {

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
            fct = defaults[op as keyof typeof defaults];
    }
    
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

function NI(b: unknown) { return NotImplemented }

//TODO: move to corelib ?
const defaults = {
    eq: function(b: unknown) { return this == b },

    add: NI,
    sub: NI,
    mul: NI,
    truediv: NI,
    floordiv: NI,
    mod: NI,
    pow: NI,

    and: NI,
    or : NI,
    xor: NI,
    lshift: NI,
    rshift: NI,

    radd: NI,
    rsub: NI,
    rmul: NI,
    rtruediv: NI,
    rfloordiv: NI,
    rmod: NI,
    rpow: NI,

    rand: NI,
    ror : NI,
    rxor: NI,
    rlshift: NI,
    rrshift: NI,
}