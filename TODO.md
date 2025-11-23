- target opts
    - not really tested everything correctly.
    - all import features not propertly tested.
- ident code.

- doc
    - macro + emit + EmitContext (?).

## Features

1. Source map.
    - sourcemap API...
        -> filtrer quel type de truc à besoin d'être mappé ?
        -> register stating pos in source map struct...
        -> emit : JS struct
            -> imported (?)
            -> exported (todo: export mode with $RB ? / imported ?)
            -> sourcemap
            -> jscode
    1. AST node : (start/end)
    2. [jspos, pypos, level, node]
    3. sort + remove duplicates.
    4. src map
    - failed test -> get line + highlight errors ?

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

1. importmap
    a. fetch/AJAX for functions.
    b. import() for modules.
    c. add module name somewhere ?
    - Import map : (sys.meta_path)

3. Compat mode / cf optimisations (?) [per file...]
    - operations on constants might be precomputed (<i>not implemented</i>).
         -> ou use Terser ?
TS/WASM generation possible.

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