- W2:
    1. runner
        - config: macros, symbols
        - ??Builtin(name, code, cfg)
        - registerBuiltin(name, symb)
        - initialize()
    2. fix NaN -> test merge=true (bench)
    3. optis on types.
    4. fct args (/!\ vals par défaut peuvent changer)
    5. dict/list/tuple/string (seulement op de bases ?)
- W3: 
    - symtable (scope) -> use Brython's...
        + add to AST structure...
        + add to node2js context...
        + documenter fonctionnement...
    - imports
    - import JS.
- W4:
    - classes
        - inherit
        - inherit base types (?)
    - async fct / generators
- W5:
    - optimizer + flags (?) + test versions (?)
    - types + object (type as python code)
- W6:
    - tools + full pipeline.
        - compiler
        - stubs
        - create stubs from py file ?
        - sourcemap / indent JS code
    - rewrite test system (tags to filter) + dirs + diff ?
    - rewrite Editor...