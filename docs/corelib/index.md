As much as possible, corelib should be implemented in Python, and should not rely on the runlib. 

For performances purposes, corelib could be pre-compiled using special emission rules.

## Special methods

RBrython defines several methods in order to access native JS operations.

### JS Operators

RBrython defines a set of functions enabling access to JS operators. 

```py
class int:
    __add__(self, b):
        return __JS_ADD__(self, b) # can't define it otherwise.
```

List of operators:
- `__JS_ADD__(a, b)`

### Log

`__JS_LOG__(...)` print its parameters in the console. This function is used for quick debugs.

### Arbitrary JS code

`__JS_WRITE__('...')` write raw JS code into the emitted JS code. You should avoid using it as much as possible.

```py
__JS_WRITE__('console.warn("Hello")')
```

## Advices

Use `@singledispatchmethod` from the functool package for functions/methods those behaviors depends on its first argument type.

```py
class int:
    @singledispatchmethod
    def __add__(self, b: object) -> int|NotImplementedType: ...

    @__add__.register
    def _(self, b: int) -> int: ...
```

It will help RBrython to optimize the code (<i>not implemented yet</i>).