1. Test system
    - revoir catégories : py // core/kernel // int/float/str/etc.
    - ne pas s'arrêter au premier assert
        - get lines (require sourcemap) ~> highlight errors ?
    - filter (?) ~> diff files for now ?

- features
    - import (+ registerModule...)
    - dict/list/tuple (seulement op de bases ?)
    - async fct / generators
- compliance
    - use symboltable
    - better function args
    - better classes
        - observer DP for multi-inheritance.
        - attr.
    - types + object (type as python code)
- tools
    - rewrite test system (tags to filter) + dirs + diff
        + included/excluded stats
        + code highlight (dont AST)
        + print() in editor Output
    - indent generated JS
    - compiler
    - JS stubs / stubs from py file ?
    - sourcemap
    - optimizer + flags (?) + test versions (?)