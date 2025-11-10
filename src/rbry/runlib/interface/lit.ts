const mapper = {
    "bigint" : "int",
    "number" : "float",
    "string" : "str",
    "boolean": "bool"
}

function getJSType(o: unknown) {
    return typeof o;
}

export default function lit(o: unknown) {
    
    // @ts-ignore
    const type = mapper[getJSType(o)];

    // @ts-ignore
    const self = Object.create(globalThis[type].prototype);
    // @ts-ignore
    __JS_SET_IVALUE__(self, o);
    return self;
}