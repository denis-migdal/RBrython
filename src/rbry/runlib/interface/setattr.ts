import { getClass } from "../helpers/getClass";

export default function setattr(o: any, key: any, v: any) {
    return getClass(o).prototype.__setattr__.call(o, key, v);
}