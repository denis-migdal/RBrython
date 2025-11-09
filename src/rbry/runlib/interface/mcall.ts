export default function mcall(o: unknown, name: string, ...args: unknown[]) {
    // @ts-ignore
    let fct = o[name];
    if( fct === undefined)
        // @ts-ignore
        return o.prototype[name].call(...args);

    // @ts-ignore
    return o[name](...args);
}