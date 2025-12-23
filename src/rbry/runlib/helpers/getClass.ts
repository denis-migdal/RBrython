import { SHADOW_JS } from "../interface/shadowJS";

export function getClass(o: unknown) {

    const typename = typeof o;

    if( typename === "function" ) {
        //TODO: is class ? is something else ?
        // @ts-ignore
        return type;
    }

    if( typename === "object" ) {

        // @ts-ignore;
        if( o.constructor === Error )
            // @ts-ignore
            return Exception;

        // @ts-ignore;
        return o.constructor;
    }

    // @ts-ignore
    //TODO: remove globalThis[]
    const lit_class = SHADOW_JS[typename];
    if( lit_class !== undefined)
        return lit_class;

    throw new Error(`JS type ${typename} not implemented yet`);
}