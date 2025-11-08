Directory: `/src/rbry/emitter`.

Public API:
- `emit(AST)`: emit JS code from the AST.

## Implementation

Each type of AST node is processed by a file of the same name in `/src/rbry/emitter/handlers`.

Internal API:
- `node2js(node: ASTNode)` : converts a node into JS string.