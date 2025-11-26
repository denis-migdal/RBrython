const test_suite = {
    "kernel/op/is": require("!!raw-loader!./py/kernel/op/is.py").default,
    "kernel/match/classes": require("!!raw-loader!./py/kernel/match/classes.py").default,
    "core/int/op"    : require("!!raw-loader!./py/core/int/op.py").default,
    "core/float/op": require("!!raw-loader!./py/core/float/op.py").default,
}

export default test_suite;