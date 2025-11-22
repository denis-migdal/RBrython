Directory: `/src/rbry/engines/`.

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
engine.registerModule("foo.fuu", {b: 3});
```

## Builtins

You can register builtin Python symbols (accessible from the global space) with:
- `.registerBuiltin(name: string, value: any)`
- `.registerBuiltins(symbols: string|PyModule)`

For example:
```ts
engine.registerBuiltins("def foo(a, /): 2*a")
engine.registerBuiltins({ foo: (a) => 2*a })
```

## Macros

You can register a [macro](../macros/index.md) with:
- `.registerMacros(macros: Record<string, Macro>)`
- `.registerMacro(name: string, fct: Macro)`

## Steps

Currently, `.run()` proceed in 4 steps you can call separately for development, benchmark, or debug purposes:
1. `.parse(pycode: string ): ParsedCode`: parse the Python code (cf <b>[parser](../parser/index.md)</b>).
2. `.emit(ast: ParsedCode, opts?: Partial<EmitterOptions>): string`: generate JavaScript code from the parsed code (cf <b>[emitter](../emitter/index.md)</b>).
3. `.loadAsFunction(jscode: string): (runlib) => PyModule`: transform the JavaScript code into a callable function (cf <b>[runner](../runner/index.md)</b>).
4. `.runFunction(f: (runlib) => PyModule): PyModule`: execute the function (cf <b>[runner](../runner/index.md)</b>).