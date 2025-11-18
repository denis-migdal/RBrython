import { getClass } from "../helpers/getClass";
import isClass from "../helpers/isClass";
import { IGNORE_ARG } from "./KW";

export default function call(a: (...args:unknown[]) => unknown, ...args: unknown[]) {

    if( args[args.length-1] === IGNORE_ARG)
        args = args.slice(0,-1);

    // @ts-ignore
    let fct = a.__call__

    if( fct === undefined ) {
        fct = a;

        // h4cky
        if( fct.prototype?.__new__ !== undefined ) {
            const b = getClass(fct).prototype.__call__;
            if( b !== undefined) {
                return b.call(fct, ...args);
            }
        }

        if( isClass(fct) ) // only for JS classes now...
            return new fct(...args);
    }

    return fct(...args);
}
