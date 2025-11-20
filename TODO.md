Group
- new dispatch

1. modules
    - export/import
    - register module
    - type of import/export
        - obj
        - ES6
        - global
        -> runner/no runner ??? (import ???)
2. Tests
    - sourcemap
    - (un)indent generated JS
    - test system: get lines (require sourcemap) ~> highlight errors ?

X. SBrython version... ?
    - assert excp... (dev/prod/test)
    - build runner... (.js)...
    - PERF|STRICT
        - operations on literals.
        - remove runners (or reduce it as much as possible).
        - remove non-common features / compatibility...
3. some refactor/warnings/cleaning works.
    - better function args
4. generation
    - compiler cmd... (tool)
        - doc...
        - compat BRYTHON ou rien.
        - export (RAW/ES6/SBRY/GLOBAL- TODO...)
        - mode (dev/prod/test - not implemented)
            __BRYTHON__.imported["exec"] = {};
            __BRYTHON__.frames_stack = [];
    - runner cmd... -> test tool (cli) ? (rbrun/rbtest)

- features
    - types + object (type as python code)
    - classes attr operation.
- more features
    -> bool inherit from int...
    - dict/list/tuple (seulement op de bases ?)
    - async fct / generators
    - observer DP for class multi-inheritance.
- checker
    - JS stubs / stubs from py file ?
    - optimizer + flags (?) + test versions (?)

- isinstance...

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