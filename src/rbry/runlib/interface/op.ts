import { getClass } from "../helpers/getClass";

// @ts-ignore
const NotImplemented = globalThis.NotImplemented = Symbol();

export default function op(a: unknown, op: string, b: unknown) {

    const ka = getClass(a);
    if( ka === undefined ) {
        console.warn(a, op);
        throw new Error("?")
    }

    let result = NotImplemented;

    let fct = ka.prototype[`__${op}__`];
    if( fct !== undefined )
        result = fct.call(a, b);

    if( result !== NotImplemented)
        return result;
    
    // iop
    if( op[0] === "i" ) {

        op = op.slice(1);
        fct = ka.prototype[`__${op}__`];
        
        if( fct !== undefined)
            result = fct.call(a, b)

        if( result !== NotImplemented)
            return result;
    }

    // try to reverse
    const kb = getClass(b);
    if( kb === undefined ) {
        console.warn(b, "r" + op);
        throw new Error("?");
    }

    let rop;
    if( op.length == 2 && op !== "or" ) // cmp
        rop = cmp_reversed[op as keyof typeof cmp_reversed];
    else
        rop = `r${op}`;
    
    fct = kb.prototype[`__${rop}__`];
    if( fct !== undefined )
        result = fct.call(b, a);

    if( result !== NotImplemented)
        return result;

    // fallbacks
    if( op === "eq" ) return a === b;
    if( op === "ne" ) return a !== b;
    
    throw new Error(`Operation not implemented ${ka.name} ${op} ${kb.name}`);
}

const cmp_reversed = {
    "lt": "gt",
    "gt": "lt",
    "le": "ge",
    "ge": "le",
    "ne": "ne",
    "eq": "eq"
}