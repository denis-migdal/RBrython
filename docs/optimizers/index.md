RBrython provides several optimization levels enabling to trade Python compliance for performances:
- `safe`: uses the type checker to perform some optimizations that should remain Python compliant.
- `unsafe`: make some assumptions on the code or take some liberties with Python.

Currently RBrython does not enable to enable/disable optimizations individually.

Optimization are mainly implemented as special emission handlers:
```ts
function X(node: ASTNode, ctx: Emitter, fallback: Handler) {
    if( canOptimize )
        return ctx.w`....`;

    // can't optimize, fallback to original behavior.
    fallback(node, ctx);
}
```


See below the list of RBrython optimizations.

## Optimisations

### Calls

In Python, 3 kinds of objects are callable:
- functions/methods ;
- classes: requires `new` for JavaScript ES6 classes.
- callable objects: doesn't exists in JavaScript.

`$RB.call(foo)` is therefore needed to assess, at runtime, how to perform the call operation on `foo`.

If the type of the object is known at build time, we can directly (and safely) perform the call:
- `foo()`
- `new Foo()`
- `foo.__call__()`

Otherwise, we'd need to make some assumptions (unsafe):
- calls on ES6 classes are make explicit (e.g. `JS.new(Foo)`) ;
- callable object are either implemented as a function, or called explicitly (e.g. `foo.__call__()`).

### Classes

ES6 JavaScript classes cannot be used to implement Python classes as it misses some features.

It would be possible to use them if:
- the class dosn't use multi-inheritance (else need prototype manipulations).
- `__new__` doesn't return a primitive.
- initialization can be performed without calling the constructor.

### Boolean coercion

In Python, objects are coerced into boolean through `bool()`.  This coercion is required when using `if`, `while`, `not`, `or`, `and`, `assert`, etc.
```ts
if( bool(condition) ) { ... }
```

This coercion can be safely removed if we know that `condition` is already a boolean (note: `bool` cannot be inherited). 

Otherwise, we'd need to make the following assumptions (<i>unsafe</i>):
- objects are explicitly coerced.
- `int`, `float`, `str` subclasses doesn't redefined `__bool__`.

We can also, in some cases remplace `bool()` by `len()`, but we'd need to assume (<i>unsafe</i>):
- objects with length subclasses doesn't redefined `__bool__`.

### Operators

Contrary to Python, in JavaScript, operators cannot be overloaded requiring to evaluate them at runtime:
```ts
$RB.op(a, "op", b)
```

We can remove that if we have the guarantee that we are manipulating primitive types. However this is hard to safely assert.

We could provide "fast" final types corresponding to primitives. Primitives can be assigned to these "fast" types as long as they do not override the relevant type coercion function(s). But again, this is hard to safely assert.
```python
def foo(a: fint, b: ffloat) {
    return a+b
}
```

Otherwise, we need to assume that primitive types can't be inherited (unsafe).

### Constant expressions

Constant expressions can safely be precomputed. However, we might want to avoid to precompute expressions that'd result in too many characters (e.g. `[0]*1000`).

We could also provide a `@constexpr` decorator to mark a function/method as pre-computable during built time (if the parameter are themselves constants expressions).

### For

- avoid using JS iterators (poorly designed):
    - `for i in range(...)` could be transform into a `for( i = a; i < b, i+=c)`. If the index isn't used, could be converted into `float`.
    - use our own iterator system when possible ?
    - when we produce an iterator, reuse the object ?

### self

`self` could internally be renamed as `this`.