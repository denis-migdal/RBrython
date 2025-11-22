Directory: `/src/rbry/runners/`.

A runner enable to run generated JavaScript code by loading the necessary:
- helpers (cf <b>[runlib](../runlib/index.md)</b>).
- builtins symbols (cf <b>[corelib](../corelib/index.md)</b>).
- standard Python modules (stdlib).

Rbrython provides 2 runners:
- `RBrythonGlobalRunner`: use RBrython.
- `BrythonGlobalRunner`: use Brython (legacy).

## Run JavaScript code

```ts
runner.run(jscode);
```

⚠ You can't dynamically run JavaScript code generated with the `module` target.

## Modules

You can get and register Python modules with the following methods:
- `.registerModule(name: string, symbols: PyModule)`
- `.getModule(name: string): PyModule`

For example:
```ts
runner.registerModule("foo.faa", {a: 2});
```

## Builtins

You can register builtin Python symbols (accessible from the global space) with:
- `.registerBuiltin(name: string, value: any)`
- `.registerBuiltins(symbols: PyModule)`

For example:
```ts
runner.registerBuiltins({ foo: (a) => 2*a })
```