import { getClass } from "../helpers/getClass";

export default function getitem(o: any, key: any) {
    return getClass(o).prototype.__getitem__.call(o, key);
}