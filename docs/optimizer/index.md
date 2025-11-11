## Changes to make

- remplace `__JS_IRUN__` by JS imports (performs an evil eval).

## Optimizations ideas (not implemented)

- precompute true/false/none objects as well as code constant ?
- precompute operations on constants.
- inline some operations (require type to be known+immutable).
- split some AST node when it performs conversions (some might cancel out each other).
    - could be node.input_conversion / node.output_conversion attribute on the AST.

- prod/dev version: dev version performs checks, prod version assume there is no error in code.

## Conditionnal optimizations ideas (not implemented)

Requires some assumptions (behind a flag) ?

- can't inherit from literal -> JS & Python type would be the same internal data structure.
- 