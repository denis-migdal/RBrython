import { getClass } from "../helpers/getClass";

export default function delitem(o: any, key: any) {
    return getClass(o).prototype.__delitem__.call(o, key);
}