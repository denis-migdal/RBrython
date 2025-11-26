## Current TODOs

- complete documentation
    - and/or bug...
    - bool() opti.
        - bool() type call... (TODO...) -> use __new__
    - macro + emit + EmitContext (?).
    - debug: include inline srcmap vs prod : separate file (srcmap url)
- runlib
    - bool() helper
    - getClass -> do not rely on type ?

Mail
- target opts
    - not really tested everything correctly.
    - all import features not propertly tested.
- ident code.

## TODO

- ~100 unittest/semaine.
- Brython support in export
- Exception trace + sourcemap
- clean JS / no runtime.

## Features

0. filename + module name etc (add to source URL in function)
0. Emit Brython
    - use $imported[module_name]...
1. Source map.
    - how to get sourcemap when dealing with errors ?
    - sourcemap API...
        1. convert JS pos with line/col
        2. [jspos, pypos, level, node]
        3. sort + remove duplicates.
        4. src map
        -> filtrer quel type de truc à besoin d'être mappé ?
        -> register stating pos in source map struct...
        -> emit : JS struct
            -> imported (?)
            -> exported (todo: export mode with $RB ? / imported ?)
            -> sourcemap
            -> jscode
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
See src/unittests

Kernel (4453 ~= 86/w):
- classes (1176)
    - descriptor (27)
    - decorators (99)
    - reflected method (95)
    - special methods (108)
    - test rmethod (+120)
- functions
    - packed_argument (+12)
- imports (112)
    - test_from_import (+26)
    - global_in_imported.py (+19)

- test_types (+129)

- f-string (138)

- exceptions (210)
    - exceptions_trace (+257)
    + src map...

- iterators (94)
    - generator (1262)

- simple (+15) (no asserts...)
- basic test suite (1132)
- test_suite (+1214)

Core (3144 ~= 60/w):
- numbers (827)
- bytes (301)
- dicts (288)
- list (496)
- test_list_methods (+74)
- memory view (17)
- sets (319)
- string format (289)
- string methods (95)
- strings (512)

Other
- exec_eval
- file open_read
- javascript objects
- pattern matching
- print (?) - contains builtin list ?
- test_buitins

- issues (+3333)
- issues BB (+895)
- issues GC (+461)

-----------

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