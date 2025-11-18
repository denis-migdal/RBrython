export let KW: Record<string, any>|null = null;

export const IGNORE_ARG = Symbol();

export function setKW(args: Record<string, any>) {
    KW = args;
    return IGNORE_ARG;
}

export function getKW() {
    if( KW === null )
        return {};
    const args = KW;
    KW = null;
    return args;
}