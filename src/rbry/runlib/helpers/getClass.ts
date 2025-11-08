import overrided_types from "./overridden_types";
import { type } from "../tmp_corelib/type";

export function getClass(o: unknown) {
    const typename = typeof o;

    if( typename === "function" ) {
        //TODO: is class ? is something else ?
        return type;
    }

    if( typename === "object" ) {
        // @ts-ignore;
        return o.constructor;
    }

    return overrided_types[typename];
}