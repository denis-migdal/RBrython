import { IVALUE } from "..";

export default function assert(cond: {[IVALUE]: boolean}) {
    if( ! cond[IVALUE] )
        throw new Error(`Assertion failed`);
}