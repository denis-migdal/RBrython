export default function attr(o: any, attr: string) {
    if( ! (attr in o) )
        return o.constructor[attr];
    return o[attr];
}