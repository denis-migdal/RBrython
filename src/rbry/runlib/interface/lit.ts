export default function lit(o: unknown) {
    //TODO...

    // @ts-ignore
    const self = Object.create(int.prototype);
    // @ts-ignore
    __JS_SET_IVALUE__(self, o);
    return self;
}