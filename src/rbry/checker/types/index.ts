export type TypeDesc = {
    // meta
    const?: boolean
    type  : object
}

export const FunctionType = {};

export function isInstance(v: TypeDesc, t: object) {
    return v !== undefined && v.type === t;
}