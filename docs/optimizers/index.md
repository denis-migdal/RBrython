RBrython provides several optimization levels enabling to trade Python compliance for performances:
- `safe`: uses the type checker to perform some optimizations that should remain Python compliant.
- `unsafe`: make some assumptions on the code or take some liberties with Python.

Currently RBrython does not enable to enable/disable optimizations individually.

See below the list of RBrython optimizations.

## Calls

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

## Booleans

- bool() opti.
    - in: if/while/or/and/not/assert
    - avoid conversion if already boolean or compatible...
    - safe vs unsafe.

## Operators

- idem operators (JS op).

## Old notes (TODO)

fct call if type is good

for
    - do not use iterator when possible, e.g. with range()...
    - check if key used outside of loop or not.

- self -> rename as this.

- precompute operations on constants.
- inline some operations (require type to be known+immutable).
- add(a, b) runner instead of op(a, op, b);
- split some AST node when it performs conversions (some might cancel out each other).
    - could be node.input_conversion / node.output_conversion attribute on the AST.

- virtual types : fint, ffloat, fstr, etc -> can inline operators...
- lit as JS types /!\ héritage ! -> valueOf() (and we're good)
- https://groups.google.com/g/brython/c/4P4mvgH02UI/m/bUpB9BUTAQAJ

- JIT: instantiation - create the JS function/class upon first usage ?
- JIT: parser - parse upon first usage (avoid).

## Conditional optimizations ideas (not implemented)

Requires some assumptions (behind a flag) ?

- can't inherit from literal -> JS & Python type would be the same internal data structure.
- or "use fast primitives" in file assumptions ?

## ?

- operations on literals.
- remove runners (or reduce it as much as possible).
- remove non-common features / compatibility...