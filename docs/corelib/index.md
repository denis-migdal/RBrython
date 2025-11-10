As much as possible, corelib should be implemented in Python, and should not rely on the runlib. 

For performances purposes, corelib could be pre-compiled using special emission rules.

## Special methods

RBrython defines several methods in order to access native JS operations.

### Hidden value

When implementing Python literals you might want to store the internal JS value, and then use it in operations:
- `__JS_SET_HVALUE__(self, v)`
- `__JS_GET_HVALUE__(self)`

### JS Operators

RBrython defines a set of functions enabling access to JS operators. Theses operators only work on JS types.

List of operators:
- `__JS_ADD__(a, b)`.

`__JS_OPH__(op, ...args)` perform the operation `op` on the hidden values of `...args`.

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