As much as possible, corelib should be implemented in Python, and should not rely on the runlib. The function `__INCLUDE_JS__('...')` can be used to include raw JS code.

```py
class int:
    __add__(a, b):
        __INCLUDE_JS__('a+b') # can't define it otherwise.
```

For performances purposes, corelib could be pre-compiled using special emission rules.

## Advices

Use `@singledispatchmethod` from the functool package for functions/methods those behaviors depends on its first argument type.

```py
@singledispatchmethod
def __add__(self, b: object) -> int|NotImplementedType: ...

@__add__.register
def _(self, b: int) -> int: ...
```

It will help RBrython to optimize the code (<i>not implemented yet</i>).