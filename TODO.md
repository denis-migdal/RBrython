- W2:
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
    - $B.imported["JS"] = $B.jsobj2pyobj( globalThis );
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
    - rewrite test system (tags to filter) + dirs + diff + included/excluded stats
    - rewrite Editor...