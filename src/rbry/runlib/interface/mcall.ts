import { IGNORE_ARG } from "./KW";

export default function mcall(o: unknown, name: string, ...args: unknown[]) {
    
    if( args[args.length-1] === IGNORE_ARG)
        args = args.slice(0,-1);
    
    // @ts-ignore
    let fct = o[name];
    if( fct === undefined) {
        // @ts-ignore
        if( o.prototype[name] === undefined) {
            // @ts-ignore
            console.warn(o, o.name, name);
        }
        // @ts-ignore
        return o.prototype[name].call(...args);
    }

    // @ts-ignore
    return o[name](...args);
}