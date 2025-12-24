const corelib = {
    object: require("!!raw-loader!./primitives/object.py").default,
    type  : require("!!raw-loader!./primitives/type.py"  ).default,
    int   : require("!!raw-loader!./primitives/int.py"   ).default,
    bool  : require("!!raw-loader!./primitives/bool.py"  ).default,
    float : require("!!raw-loader!./primitives/float.py" ).default,
    str   : require("!!raw-loader!./primitives/str.py"   ).default,
    tuple : require("!!raw-loader!./primitives/tuple.py" ).default,
    list  : require("!!raw-loader!./primitives/list.py"  ).default,
    dict  : require("!!raw-loader!./primitives/dict.py"  ).default,

    format: require("!!raw-loader!./print/format.py").default,
    repr  : require("!!raw-loader!./print/repr.py"  ).default,
    print : require("!!raw-loader!./print/print.py" ).default,

    abs  : require("!!raw-loader!./operators/abs.py"  ).default,
    len  : require("!!raw-loader!./operators/len.py"  ).default,

    range: require("!!raw-loader!./iterators/range.py").default,
    next : require("!!raw-loader!./iterators/next.py" ).default,

    Exception: require("!!raw-loader!./Exception.py"  ).default,
    isinstance: require("!!raw-loader!./isinstance.py").default,
}

export default corelib;