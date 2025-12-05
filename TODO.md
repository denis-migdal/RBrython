Mail:
    - why does FormattedValue : format_spec is also a FormattedStr ?
    - async: normal fct async, call that differs...
    - locals.$op / locals.$test : do not need if the repeated thing is Constant or Name ASTNode.
    - $B.bool() not needed if arg is compare ASTNode or not or already a boolean cste ASTNode.

    - more kernel unittest.

    - __iter__ also creates [Symbol.iterator]

    - 6.5x smaller / 3x faster
    - corelib + unit test
        - ~100 line/weeks 1year.
    - then ES6 classes.

## Directions

1. Pass unit tests (~100/weeks).
2. Remove limitations (status)
3. Optimizations / type checker.
4. Implement corelib.
5. Other features
   1. --export support for Brython
   2. sourcemap + exception trace (require for exceptions)

## Roadmap

- inherit object + how to type ?
    - type hérite object et auto-ref fait après ?
    - pas un héritage classique, auto-référence faite manuellement
        - object.__class__ = type
        - type.__class__ = type (métaclasse d’elle-même)
        - type.__bases__ = (object,)
        - object.__bases__ = () (c’est la racine)
    - __le__ => même implémentation, mais en réalité 2 méthodes différentes.

X. Classes
    - doc init
    - __new__ / () arg parsing
    - class decorator
    - method decorator
    - ?

Y. typechecker improvements
    - variables types
    - fct return type (+switch)
Y. opti improvements
    - for opti (range)
    - operators/inline
    - self

Z. corelib
    - t-string
    - dict/set/list/tuple...
    - unpack operator (*) [iterator proto]
    - ** operator => mapping proto (.keys() + getitem ?)
    - unpack variables.
    - + set comprehension + dict comprehension.
    - list/tuple comprehension
Z. Generators (for list/tuple/others)
        - inter()
    - handmade generator (sync/async)
        __iter__ -> use generator (yield)
        __getitem__ (fallback de __iter__)
        ~> JS [Symbol.iterator]
    - handmade iterator (sync/asyc)
        ~> instanceof Iterator.
        - __next__
    - __reversed__
    - async gen/iter
        - __aiter__() (async)
        - __anext__() (async)
    - for comprehension with async
        - + async for comprehension
        - + await in for comprehension

Z. Match/case
Z. import resolver

## Features

0. Emit Brython
    - filename + module name etc (add to source URL in function)
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
        - functions
        - object + NotImplemented
    - /!\ circular deps.
        - runner <-> RBrythonGlobalRunner (give it as fct parameter ~= context)
    - classes
        - better attr operation (on classes)
        - bool inherit from int...
        - observer DP for class multi-inheritance.
    - dict/list/tuple (seulement op de bases ?)
    - async fct / generators

X. Editor
    - URL &test= (change)
    - code in base64 (share)
    - show errors (assert)

1. importmap
    a. fetch/AJAX for functions.
    b. import() for modules.
    c. add module name somewhere ?
    - Import map : (sys.meta_path)

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