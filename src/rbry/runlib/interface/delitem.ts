import { getClass } from "../helpers/getClass";

export default function getitem(o: any, key: any) {
    return getClass(o).prototype.__delitem__.call(o, key);
}