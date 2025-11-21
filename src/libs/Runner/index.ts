import Runner from "@RBrython/rbry/runners/RBrythonGlobalRunner";

const runner = new Runner();

runner.registerModule("JS", globalThis);

const builtins = [
    require("!!raw-loader!@RBrython/rbry/corelib-aot/bool.js").default,
    require("!!raw-loader!@RBrython/rbry/corelib-aot/float.js").default,
    require("!!raw-loader!@RBrython/rbry/corelib-aot/int.js").default,
    require("!!raw-loader!@RBrython/rbry/corelib-aot/str.js").default
]

for(let builtin of builtins)
    runner.registerBuiltins( runner.loadAsFunction( builtin ) );

export default runner;