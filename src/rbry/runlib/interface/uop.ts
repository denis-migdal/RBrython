import { getClass } from "../helpers/getClass";

export default function uop(op:string, a: unknown) {

    if( op === "not") {
        // @ts-ignore
        return ! bool(a);
    }

    const ka = getClass(a);

    if( ka === undefined ) {
        console.warn(a, op);
        throw new Error("?")
    }

    let fct = ka.prototype[`__${op}__`];
    return fct.call(a);
}