TODO: source map.

RBrython [engine](./docs/runner/engine.md) distinguishes several processes:
- <b>[parser](./docs/parser/index.md)</b>: transform Python code into AST (<i>for now uses Brython</i>).
- <b>checker</b>: deduce and check typehints in the AST (<i>not implemented</i>).
- <b>[optimizer](./docs/optimizer/index.md)</b>: transform the AST using deduced types as well as some assumptions (<i>not implemented</i>).
- <b>[emitter](./docs/emitter/index.md)</b>: generate JavaScript code from the AST.
- <b>[runner](.)</b>: run generated JavaScript code.

Theses processes depends on an [AST structure](./docs/ast/index.md), for now we use Brython's.

RBrython also provides the following libraries:
- <b>[runlib](./docs/runlib/index.md)</b>: a set of helpers used to execute the generated JavaScript code.
- <b>[corelib](./docs/corelib/index.md)</b>: an implementation of builtin Python functions and structures.
- <b>stdlib</b>: an implementation of standard Python libraries (<i>out of scope</i>).

RBrython distinguishes two parts:
- <i>kernel</i>: Python without the corelib.
- <i>core</i>: Python with the corelib.