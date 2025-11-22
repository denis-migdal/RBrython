Directory: `/src/rbry/corelib/`.

Implementation of Python builtin symbols (e.g. `int`, `isinstance`).

## Writing a corelib module

A corelib module should be implemented in Python, and should not rely on the runlib.

Indeed, in such case, corelib would depend on the way we implement Python features during emission and in the runlib. Then each change on these parts might necessitate extensive refactoring in the corelib.

To access JavaScript features, you can either:
- load JavaScript global scope with `import JS`.
- use [macros](../macros/index.md) (a kind of JavaScript function inlined during emission).

💡 For performances purposes, corelib can be pre-compiled:
```bash
./tools/rbc src/rbry/corelib/ --target function --outDir src/rbry/corelib-aot
```

## Advices

If a function/method behavior depends on one of its argument type, use a <i>class matching</i> pattern as the first instruction. In the future, this will help RBrython to optimize the code (<i>not implemented yet</i>).

```py
class float:
    def __add__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(self, "+", o)
            case int  (): return __JS_OP__(self, "+", __JS_AS_NUMBER__(o))
            case _      : return NotImplemented
```
