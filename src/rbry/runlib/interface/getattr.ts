import { getClass } from "../helpers/getClass";

export default function getattr(o: any, key: any) {
    /*
    if( ! (attr in o) )
        return o.constructor[attr];
    return o[attr];
    */
    return getClass(o).prototype.__getattribute__.call(o, key);
}