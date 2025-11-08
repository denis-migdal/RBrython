Currently Brython AST is used.

ASTNode types are defined in `src/rbry/ast/types`.

Helpers are defined in `src/rbry/ast/` :
- `nodeType(node: ASTNode)` : returns the ASTNode type.
- `getOp(op: OperatorNode)` : returns the operator name.
