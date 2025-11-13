import { type } from "../tmp_corelib/type";

const mapper = {
    "bigint" : "int",
    "number" : "float",
    "string" : "str",
    "boolean": "bool"
}

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

    // @ts-ignore
    const lit_class = globalThis[mapper[typename]];
    if( lit_class !== undefined)
        return lit_class;

    throw new Error(`JS type ${typename} not implemented yet`);
}