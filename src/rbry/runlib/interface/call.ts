import { getClass } from "../helpers/getClass";
import isClass from "../helpers/isClass";

export default function call(a: (...args:unknown[]) => unknown, ...args: unknown[]) {

    // @ts-ignore
    let fct = a.__call__
    if( fct === undefined ) {
        fct = a;

        if( isClass(fct) ) {

            const b = getClass(fct).prototype.__call__;
            if( b === undefined)
                return new fct(...args);
            else
                return b.call(fct, ...args);
        }
    }

    return fct(...args);
}
