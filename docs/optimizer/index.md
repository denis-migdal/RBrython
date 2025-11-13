## Changes to make

- remplace `__JS_IRUN__` by JS imports (performs an evil eval).
- use JS lit.

## Optimizations ideas (not implemented)

- precompute operations on constants.
- inline some operations (require type to be known+immutable).
- split some AST node when it performs conversions (some might cancel out each other).
    - could be node.input_conversion / node.output_conversion attribute on the AST.

- lit as JS types.
    - /!\ héritage !
        -> valueOf() (and we're good)
- https://groups.google.com/g/brython/c/4P4mvgH02UI/m/bUpB9BUTAQAJ

- prod/dev version: dev version performs checks, prod version assume there is no error in code.

- JIT: instantiation - create the JS function/class upon first usage ?
- JIT: parser - parse upon first usage (avoid).

## Conditional optimizations ideas (not implemented)

Requires some assumptions (behind a flag) ?

- can't inherit from literal -> JS & Python type would be the same internal data structure.
    -> or USE_NAT option for cste ?
    -> or assumed to be transformed into ?
        -> use Number/Boolean/BigInt/etc.