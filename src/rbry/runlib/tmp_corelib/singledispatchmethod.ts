import { getClass } from "../helpers/getClass";

export default function singledispatchmethod(f: (...args: any) => any) {

    const registered = {} as Record<string, (...args: any) => any>;

    const dec = function(this: any, ...args: any) {
        // @ts-ignore
        const sf = registered[getClass(args[0]).name];

        if( sf !== undefined)
            return sf.call(this, ...args);

        return f.call(this, ...args);
    }

    // @ts-ignore
    dec.register = (f, type: string) => {
        registered[type] = f;
    }

    return dec;
}