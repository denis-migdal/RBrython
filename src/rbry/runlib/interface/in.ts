import { getClass } from "../helpers/getClass";

export default function _in(e: any, c: any) {

    const kc = getClass(c);
    if( kc === undefined ) {
        console.warn(c);
        throw new Error("?")
    }

    let fct = kc.prototype["__contains__"];
    if( fct !== undefined )
        return fct.call(c, e);

    fct = kc.prototype[Symbol.iterator] //kc.prototype["__iter__"];
    if( fct !== undefined ) {
        for( let elem of fct.call(c) )
            // @ts-ignore
            if( $RB.op(elem, "eq", e) )
                return true;
        return false;
    }

    throw new Error("Not implemented");
    //TODO: getitem...

}