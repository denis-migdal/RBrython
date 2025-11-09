Directory: `/src/rbry/emitter`.

Public API:
- `emit(AST)`: emit JS code from the AST.

## Implementation

Each type of AST node is processed by a file of the same name in `/src/rbry/emitter/handlers`.

Internal API:
- `node2js(node: ASTNode)` : converts a node into JS string.

## Details

### Method decorators

Method decorators are implemented using [static initialization blocs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks).

Currently, `singledispatchmethod`'s `.register` decorator is hardcoded in the emitter.