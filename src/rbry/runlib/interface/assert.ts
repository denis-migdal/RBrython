export default function assert(cond: boolean) {
    if( ! cond )
        throw new Error(`Assertion failed`);
}