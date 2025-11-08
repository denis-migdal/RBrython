import isClass from "../helpers/isClass";

export default function call(a: (...args:unknown[]) => unknown, ...args: unknown[]) {

    // @ts-ignore
    let fct = a.__call__
    if( fct === undefined ) {
        fct = a;

        if( isClass(fct) )
            return new fct(...args);
    }


    //TODO: class instantiate...
    return fct(...args);
}
