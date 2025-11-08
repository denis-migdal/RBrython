| RBrython | Brython | Desc |
|---|---|---|
| `op(a, opname, b)` | `rich_op(opname, a, b)` | Binary operation |
| `uop(opname, a)` | `$getattr($B.get_class(a), opname)(a)` | Unary operation |
| `attr(obj, attr)` | `$getattr_pep657(obj, attr)` | |
| `call(callable, ..args)` | `$call(callable)(...args)` |  |
| `mcall(obj, attr, ..args)` | attr+call | Method call |
| `assert(cond)` | `assert(cond, msg)` | |

## Internal helpers

| RBrython | Brython | Desc |
|---|---|---|
| `getClass(o)` | `get_class(o)` | |