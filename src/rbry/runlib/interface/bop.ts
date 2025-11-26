import toBool from "../helpers/toBool";

// Need different from op due to and/or collision.
export default function bop(a: unknown, op: string, b: unknown) {

    if( op === "and") {
        return toBool(a) ? b
                         : a;
    }
    if( op === "or") {
        return toBool(a) ? a
                         : b;
    }

    throw new Error(`Unknown boolean operator ${op}`);
}