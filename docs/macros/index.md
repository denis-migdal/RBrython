Directory : `/src/rbry/engines/RBrython/macros.ts`.

RBrython provides macros to access native JS features. You can see macros as a kind of Python function inlined during emission.

💡 In order to fix typehints errors, you can import them using `from RBM import ...`.

## Implementing a macro

A macro is a simple JavaScript function receiving its arguments as AST nodes, and returning the JavaScript code to write:
```ts
__JS_ADD__ = (a: ASTNode, b: ASTNode) => {
    return `${node2js(a)}+${node2js(b)}`;
}
```

## Existing macros

### JavaScript operators

RBrython gives access to JavaScript operators through the following macros:
- `__JS_OP__(a, op, b)` : perform the JavaScript <i>binary</i> operation `a [op] b`.
- `__JS_OP__(op, a)` : perform the JavaScript <i>prefix unary</i> operation `[op] a`.

### Conversions (not really macro)

- `__JS_AS_NUMBER__(o)` : convert `o` into a JavaScript number.
- `__JS_AS_STRING__(o)` : convert `o` into a JavaScript string.

### Log (not really macro)

`__JS_LOG__(...)` print its parameters in the console. This function is used for quick debugs.

### Internal value (not really macro)

When implementing some Python types you might want to store an internal JavaScript value for internal operations:
- `__JS_SET_IVALUE__(self, v)`
- `__JS_GET_IVALUE__(self)`

### Insert arbitrary JavaScript code

- `__JS_RUN__('(...) => ...', ...args)` insert complex computations during emission.
```py
__JS_RUN__('(a,b) => a+b', a, b)
```

- `__JS_WRITE__('...')` insert raw JavaScript code during emission. You should avoid it as much as possible.
```py
__JS_WRITE__('console.warn("Hello")')
```