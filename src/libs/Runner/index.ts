import Runner from "@RBrython/rbry/runners/RBrythonGlobalRunner";

const runner = new Runner();

runner.registerModule("JS", globalThis);

//TODO: aot builtins -> use ES6...
runner.registerBuiltins( runner.loadAsFunction( require("!!raw-loader!@RBrython/rbry/corelib-aot/bool.js").default ) );
runner.registerBuiltins( runner.loadAsFunction( require("!!raw-loader!@RBrython/rbry/corelib-aot/float.js").default ) );
runner.registerBuiltins( runner.loadAsFunction( require("!!raw-loader!@RBrython/rbry/corelib-aot/int.js").default ) );
runner.registerBuiltins( runner.loadAsFunction( require("!!raw-loader!@RBrython/rbry/corelib-aot/str.js").default ) );

export default runner;