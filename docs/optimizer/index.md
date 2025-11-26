## Optimizations ideas (not implemented)

for
    - do not use iterator when possible, e.g. with range()...
    - check if key used outside of loop or not.

- self -> rename as this.

- precompute operations on constants.
- inline some operations (require type to be known+immutable).
- add(a, b) runner instead of op(a, op, b);
- split some AST node when it performs conversions (some might cancel out each other).
    - could be node.input_conversion / node.output_conversion attribute on the AST.

- lit as JS types /!\ héritage ! -> valueOf() (and we're good)
- https://groups.google.com/g/brython/c/4P4mvgH02UI/m/bUpB9BUTAQAJ

- prod/dev version: dev version performs checks, prod version assume there is no error in code.
    - remove asserts

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