import { getClass } from "../helpers/getClass";

export default function getitem(o: any, key: any, v: any) {
    return getClass(o).prototype.__setitem__.call(o, key, v);
}