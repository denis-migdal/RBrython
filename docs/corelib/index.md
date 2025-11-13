As much as possible, corelib should be implemented in Python, and should not rely on the runlib. 

For performances purposes, corelib could be pre-compiled using special emission rules.

## JS macro

RBrython enable to define JavaScript macros in order to access native JS operations. During the emission, calls to such macros may be replaced by their JS code.

### Internal value

When implementing Python literals you might want to store the internal JS value, and then use it in operations:
- `__JS_SET_IVALUE__(self, v)`
- `__JS_GET_IVALUE__(self)`

### JS Operators

RBrython defines a set of functions enabling access to JS operators. Theses operators only work on JS types.

- `__JS_OP__(a, op, b)` : perform the binary JS operation op on a and b.
- `__JS_OP__(op, a)` : perform the unary JS operation op on a.

### Convertions

- `__JS_AS_NUMBER__(o)` : convert `o` into a JS number.
- `__JS_AS_STRING__(o)` : convert `o` into a JS string.

### Log

`__JS_LOG__(...)` print its parameters in the console. This function is used for quick debugs.

### Arbitrary JS code

- `__JS_RUN__('(...) => ...', ...args)` performs complex computations.

```py
__JS_RUN__('(a,b) => a+b', a, b)
```

- `__JS_WRITE__('...')` write raw JS code into the emitted JS code. You should avoid using it as much as possible.

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