import { getClass } from "../helpers/getClass";
import { NotImplemented } from "../tmp_corelib/NotImplemented";

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

//TODO: move to corelib ?
const defaults = {
    eq: function(b: unknown) { return this == b }
}