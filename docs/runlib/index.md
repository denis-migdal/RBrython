## Interface

| RBrython | Brython | Desc |
|---|---|---|
| `op(a, opname, b)` | `rich_op(opname, a, b)` | Binary operation |
| `uop(opname, a)` | `$getattr($B.get_class(a), opname)(a)` | Unary operation |
| `attr(obj, attr)` | `$getattr_pep657(obj, attr)` | |
| `call(callable, ...args)` | `$call(callable)(...args)` |  |
| `mcall(obj, attr, ...args)` | attr+call | Method call |
| `assert(cond)` | `assert(cond, msg)` | |

### Recommandations for Brython

0. positions are given as the last parameters, which is incompatible with varargs. Maybe should it be given as the first parameter ?
1. `$call` create a callable instead of performing the call itself, I think it should perform the call.
2. There is no functions for method call. IIRC, `getattr` will bind the method. Having a method call function would avoid the bind.
3. There is no function for unary operator. Having a e.g. `rich_uop(opname, a, pos)` could benefit Brython.

Opinions:
- I prefer using a source map instead of giving each functions the position as a parameter. Requiring to get the current line by parsing exception stacktrace. However, this is Browser dependant.

## Internal helpers

| RBrython | Brython | Desc |
|---|---|---|
| `getClass(o)` | `get_class(o)` | |