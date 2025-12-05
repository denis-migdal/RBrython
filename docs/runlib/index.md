Directory: `/src/rbry/runlib/`.

A set of helpers used to emulate Python specific behaviors.

RBrython helpers are usually in found the `$RB` JavaScript object (`$B` for Brython).

## Interface

| RBrython | Brython | Desc |
|---|---|---|
| `op(a, opname, b)` | `rich_op(opname, a, b)` | Binary operation |
| `uop(opname, a)` | `$getattr($B.get_class(a), opname)(a)` | Unary operation |
| `in(elem, container)` | `$is_member(elem, container)` | |
| `getattr(obj, attr)` | `$getattr_pep657(obj, attr)` | |
| `setattr(obj, attr, value)` | `$setattr1(obj, attr, value)` | |
| `delattr(obj, attr)` | `$delattr(obj, attr, value)` | |
| `getitem(obj, idx)` | `$getitem(obj, attr)` | |
| `setitem(obj, idx, value)` | `$setitem(obj, attr, value)` | |
| `delitem(obj, idx)` | `$delitem(obj, attr, value)` | |
| `call(callable, ...args)` | `$call(callable)(...args)` |  |
| `mcall(obj, attr, ...args)` | attr+call | Method call |
| `assert(cond, msg)` | `assert(cond, msg)` | |
| NotImpl | `$raise(e)` ||
| `setKW(kw)` | | in a call, set kw args |
| `getKW(): kw` | | in a call, get kw args |
| `getModule(name)` | ? | get loaded module (async) |
| `getModuleSync(name)` | ? | get loaded module (sync) |
| `saveTmp(x)` | `locals.$test/$op = x` | Save a temporary value |
| `tmp()` | `locals.$test/$op` | Use a temporary value |
| `getTmp()` | `locals.$test/$op` | Use and clear a temporary value |
| `withTmp(expr)` | | Return the result of `expr` and clear the temporary value |


## Internal helpers

| RBrython | Brython | Desc |
|---|---|---|
| `getClass(o)` | `get_class(o)` | |
| `isClass(o)` | ? | assert if should be called with `new` |

Note: `getClass` is included in `$RB` (verify is really needed).

## Recommandations for Brython

0. positions are given as the last parameters, which is incompatible with varargs. Maybe should it be given as the first parameter ?
1. `$call` create a callable instead of performing the call itself, I think it should perform the call.
2. There is no functions for method call. IIRC, `getattr` will bind the method. Having a method call function would avoid the bind.
3. There is no function for unary operator. Having a e.g. `rich_uop(opname, a, pos)` could benefit Brython.
4. Replace long function and class definition by an helper, e.g. `createFct(meta, () => {})`. Note: maybe using `new Function(patch(fct.toString()))` upon first call ?

Opinions:
- I prefer using a source map instead of giving each functions the position as a parameter. Requiring to get the current line by parsing exception stacktrace. However, this is Browser dependant.