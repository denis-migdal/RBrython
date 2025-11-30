Directory: `/src/rbry/emitter/`.

Generate JavaScript code from parsed Python code:
```ts
.emit(parsed: ParsedCode, opts?: Partial<EmitterOptions>): string
```

Options:
- mode: see [RBrython mode](../../../?tab=readme-ov-file#mode).
- target: see [RBrython target](../../../?tab=readme-ov-file#target).
- opti: see [RBrython optimizer](../../../?tab=readme-ov-file#optimizer).
- exports: see [RBrython export](../../../?tab=readme-ov-file#export).
- sync: see [RBrython sync](../../../?tab=readme-ov-file#sync).

## Macro

You can register a [macro](../macros/index.md) with:
- `.registerMacros(macros: Record<string, Macro>)`
- `.registerMacro(name: string, fct: Macro)`

## Implementation

Each node of the AST tree is converted into JavaScript code by a file in `/src/rbry/emitter/handlers/` corresponding to the AST node type:
```ts
function X(node: ASTNode, ctx: EmitContext) {
    ctx.w`...`
}
```

`EmitContext` enables to write to the output, i.e. into the generated JavaScript "file". To that extends, it provides several methods:
- `ctx.w`: used to write from a template string.
- `ctx.w_str(s)`: writes a raw string.
- `ctx.w_body(b)`: writes a body.
- `ctx.w_node(n)`: calls the handler associated to the node.

`EmitContext` also provides other helper methods.

💡 RBrython provides helper to facilitate AST node manipulations in the directory `/src/rbry/ast/`:
- `nodeType(node: ASTNode): string`: extract the AST node type.

💡 RBrython defines AST node types in the directory `/src/rbry/ast/types/`.

## Macro

RBrython enables access to low level JavaScript features through the usage of [macros](../macros/index.md) (a kind of JavaScript function inlined during emission).

TODO: how to define macros.

## Design decisions

Due to some limitations of the JavaScript language, the following design choices has been made.

### Representation of Python types

Python types can't be implemented as ES6 classes due to differences with Python classes (e.g. multi-inheritance, `__new__`/`__init__` behaviors).

Therefore, Python types are implemented as constructor functions (used before ES6 classes):
```ts
// definition
function X() {
    return Object.create(X);
}
X.prototype.foo = function foo() {}

// usage
const x = X();
x.foo();
```

### Keyword arguments

JavaScript has no concept of keyword arguments. 

This features is implemented through the use of:
- `$RB.setKW(kw: Record<string, any>)`: set the keyword arguments during call
- `$RB.getKW(): Record<string, any>`: get the keyword arguments in function parameters.

```ts
function foo(a, {b} = $RB.getKW()) {
    // ...
}

$RB.call(foo, 1, $RB.setKW({b: 2}));
```

### Method decorators (in ES6 classes)

Currently RBrython do not use ES6 classes.

In the future, if ES6 classes are used, method decorators would be implemented using [static initialization blocs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Static_initialization_blocks):
```ts
class X {
    static {
        this.prototype.foo = decorate(function foo(){})
    }
}
```