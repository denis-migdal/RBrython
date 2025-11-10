import { IVALUE } from "..";
import { getClass } from "../helpers/getClass";
import lit from "./lit";

export default function uop(op:string, a: unknown) {

    if( op === "not") {
        // @ts-ignore
        return lit(! a[IVALUE]);
    }

    const ka = getClass(a);

    if( ka === undefined ) {
        console.warn(a, op);
        throw new Error("?")
    }

    let fct = ka.prototype[`__${op}__`];
    return fct.call(a);
}