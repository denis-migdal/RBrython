Directory: `/src/rbry/emitter`.

Public API:
- `emit(AST)`: emit JS code from the AST.

## Implementation

Each type of AST node is processed by a file of the same name in `/src/rbry/emitter/handlers`.

Internal API:
- `node2js(node: ASTNode)` : converts a node into JS string.

## Details

### Python types

Python types are implemented as constructor functions. Indeed, some of Python features can't be implemented with ES6 classes (e.g. `__new__`/`__init__` behaviors, multi-inheritance, etc).

### Method decorators (TODO: non-ES6 classes)

Method decorators are implemented using [static initialization blocs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks).

Currently, `singledispatchmethod`'s `.register` decorator is hardcoded in the emitter.