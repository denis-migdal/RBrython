Group
- 2x faster
- new dispatch (int)
- runners/engines (compatible Brython).
- prod (-OO python)
- doc
    - https://github.com/denis-migdal/RBrython/tree/master
    - https://github.com/denis-migdal/RBrython/blob/master/docs/engine/index.md

- TODO
    - sourcemap
    - export modes (e.g. ES6 modules).
    - opti/compat mode (later).
    - well ofc implement...

## Features

2. Tests
    - sourcemap
    - (un)indent generated JS
    - test system: get lines (require sourcemap) ~> highlight errors ?

- features
    - builtins (write in Python)
        - functions (abs/etc) in runlib
        - object + type + NotImplemented
        - isinstance
    - /!\ circular deps.
        - runner <-> RBrythonGlobalRunner (give it as fct parameter ~= context)
    - classes
        - better attr operation (on classes)
        - bool inherit from int...
        - observer DP for class multi-inheritance.
    - dict/list/tuple (seulement op de bases ?)
    - async fct / generators

3. Compat mode / cf optimisations (?) [per file...]
    - operations on constants might be precomputed (<i>not implemented</i>).
         -> ou use Terser ?
4. Export mode...

## Tests

Tests from : https://github.com/brython-dev/brython/tree/master/www/tests

- unittests (cf editor)
    + list of builtins
    - https://github.com/brython-dev/brython/blob/master/www/tests/test_decorators.py
    - https://github.com/brython-dev/brython/blob/master/www/tests/test_exceptions.py
    - https://github.com/brython-dev/brython/blob/master/www/tests/test_iterators.py
    - https://github.com/brython-dev/brython/blob/master/www/tests/test_rmethods.py
    - https://github.com/brython-dev/brython/blob/master/www/tests/test_fstrings.py
    - https://github.com/brython-dev/brython/blob/master/www/tests/test_types.py

- https://docs.python.org/3/reference/datamodel.html#numbers-integral
- https://docs.python.org/3/reference/datamodel.html#emulating-numeric-types

- fct 71 : https://docs.python.org/3/library/functions.html
- cst  6 : https://docs.python.org/3/library/constants.html
- types  : https://docs.python.org/3/library/stdtypes.html
- exc : https://docs.python.org/3/library/exceptions.html

## Old sbry code

+ sbry/TODO.md
+ sbry/src/sbry + sbry/src/runtime
+ sbry/pages/compat

Benchmark: (disable privacy.reduceTimerPrecision on FF for better precision)

## Discussions

- https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/ftPUn9LMAAAJ
- https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/KnnzMS6QAAAJ