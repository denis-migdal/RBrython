export type TypeDesc = {
    // meta
    const?: boolean
    type  : object
}

export const FunctionType = {};
export const BoolType = {};

export function isInstance(v: TypeDesc, t: object) {
    return v !== undefined && v.type === t;
}