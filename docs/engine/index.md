Directory: `/src/rbry/engines`.

Rbrython provides 2 engines:
- `RBrythonEngine`: use RBrython.
- `BrythonEngine`: use Brython (legacy).

## Run Python code

To run Python code, simply use the `run()` method:
```ts
engine.run("1+1");
```

💡 You can also configure the engine (cf below).

⚠ Currently, some configurations might be global.

⚠ Some configurations might not be supported by Brython.

## Modules

You can get and register Python modules with the following methods:
- `.registerModule(name: string, symbols: string|PyModule)`
- `.getModule(name: string): PyModule`

For example:
```ts
engine.registerModule("foo.faa", "a=2");
```

## Builtins

You can register builtin Python symbols (accessible from the global space) with:
- `.registerBuiltin(name: string, value: any)`
- `.registerBuiltins(symbols: string|PyModule)`

For example:
```ts
engine.registerBuiltins({
    foo: (a,b) => a+b
})
```

## Steps

Currently, `.run()` proceed in 3 steps you can call separately for development,benchmark, or debug purposes:
1. `.parse(pycode: string ): ParsedCode`: parse the Python code (cf <b>[parser](./docs/parser/index.md)</b>).
2. `.emit(ast: ParsedCode): string`: generate JavaScript code from the parsed code (cf <b>[emitter](./docs/emitter/index.md)</b>).
3. `.loadAsFunction(jscode: string): () => PyModule`: transform the JavaScript code into a callable function (cf <b>[runner](./docs/runner/index.md)</b>).