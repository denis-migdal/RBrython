Group
- new dispatch
- runners
- doc

Doc
    
    - runners/engines // registerModule/getModule/registerBuiltin/registerBuiltins

    - dev doc
        - Writing core modules

    - architecture

1. Prod
    - prod/test ([-OO flag])
        + assert (keep in test)
        + __debug__
            ~> cste (?)
        + docstrings
        + do not indent JS code
        + useless {}
        + other possible opti... (not test)
3. Tests
    - sourcemap
    - (un)indent generated JS
    - test system: get lines (require sourcemap) ~> highlight errors ?

- features
    - types + object (type as python code)
    - classes attr operation.
    - isinstance...
- more features
    -> bool inherit from int...
    - dict/list/tuple (seulement op de bases ?)
    - async fct / generators
    - observer DP for class multi-inheritance.


X. tools
    - compiler cmd... (tool)
        - doc...
        - compat BRYTHON ou rien.
        - export (RAW/ES6/SBRY/GLOBAL- TODO...)
        - mode (dev/prod/test - not implemented)
            __BRYTHON__.imported["exec"] = {};
            __BRYTHON__.frames_stack = [];
    - runner cmd... -> test tool (cli) ? (rbrun/rbtest)
X. different runners (?)
    - global/raw
    -> avoid using globalThis (somehow)...
        - obj
        - ES6
    -> runner/no runner ??? (import ???)
    -> build runlib... (.js)...
X. Opti/checker
    - PERF|STRICT
        - operations on literals.
        - remove runners (or reduce it as much as possible).
        - remove non-common features / compatibility...
    - JS stubs / stubs from py file ?
    - optimizer + flags (?) + test versions (?)

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

+ sbry/TODO.md
+ sbry/src/sbry + sbry/src/runtime
+ sbry/pages/compat

(disable privacy.reduceTimerPrecision on FF for better precision)

Tests from : https://github.com/brython-dev/brython/tree/master/www/tests

cf https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/ftPUn9LMAAAJ
https://groups.google.com/g/brython/c/5Y4FneO3tzU/m/KnnzMS6QAAAJ