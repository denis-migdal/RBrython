import { getClass } from "../helpers/getClass";

export default function delattr(o: any, key: any) {
    return getClass(o).prototype.__delattr__.call(o, key);
}