import { getClass } from "../helpers/getClass";

export default function uop(op:string, a: unknown) {

    const ka = getClass(a);

    if( ka === undefined ) {
        console.warn(a, op);
        throw new Error("?")
    }

    let fct = ka.prototype[`__${op}__`];
    if( fct === undefined) {
        console.warn(a, ka);
        throw new Error(`__${op}__ not defined`);
    }
    return fct.call(a);
}