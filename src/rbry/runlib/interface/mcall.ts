export default function mcall(o: unknown, name: string, ...args: unknown[]) {
    // @ts-ignore
    return o[name](...args);
}