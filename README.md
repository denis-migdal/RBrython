<div align="center">
  <h1>RBrython (POC)</h1>

  <p>Trying a new architecture for Brython</p>
</div>

## Architecture

<i>Note: some features are not yet implemented but can be found in [SBrython](https://github.com/denis-migdal/SBrython).</i>

RBrython distinguishes several processes:
- <b>parser</b>: transform Python code into AST (<i>for now uses Brython</i>).
- <b>checker</b>: deduce and check typehints in the AST (<i>not implemented</i>).
- <b>optimizer</b>: transform the AST using deduced types as well as some assumptions (<i>not implemented</i>).
- <b>emitter</b>: generate JS code from the AST.
- <b>runner</b>: run generated JS code (<i>not implemented</i>).

Theses processes depends on an AST structure, for now we use Brython's.

RBrython also provides the following libraries:
- <b>[runlib](./docs/runlib/index.md)</b>: a set of helpers used to execute the generated JS code (<i>todo link</i>).
- <b>corelib</b>: an implementation of builtin Python functions and structures.
- <b>stdlib</b>: an implementation of standard Python libraries (<i>out of scope</i>).

RBrython provides the following tools:
- sourcemaps (<i>not implemented</i>) ;
- stubs (<i>not implemented</i>) ;
- compiler (<i>not implemented</i>) ;
- a documentation.

## Goals

RBrython aims at better interactions between Python and JS code while avoiding conversions.

RBrython focuses on the core of Python, it doesn't aim to maintain standard Python libraries.

RBrython does not directly focuses on runtime performances. However performances can be achieved through an optimizer, or by re-writing critical parts in JS (which should be made easier by RBrython).

RBrython does not aim for transcription performances and prefers AoT compilation.

## Principles

### Principle 0

RBrython should respect the principles of clean code and clean architecture.

### Principle 1

In order to limit the scope of changes, the several RBrython parts should be as independent as possible.

For example, corelib and stdlib should not rely on runlib. This means that they either have to be implemented in Python, or in vanilla JS. Indeed, as they are huge code bases, each minor changes in the runlib interface would be hell.

### Principle 3

RBrython should be free from JS-Python data conversions. Python use of classes/functions from JS should be transparent, and vice versa.

### Principle 4

RBrython should represent Python data as vanilla JS data showing intend, not behavior. RBrython Python specific behaviors should be implemented inside Python operations, and should be reflected on the data.

For example, declaring a method should be written in JS as:
```js
class X {
  foo() {}
}
```

Then, the following Python code `X.foo(x)` should be made possible without changing the class definition in JS, but by changing the call behavior. 

## Test

Current : 22/~88
+1

- http://127.0.0.1:5501/Editor/
- http://127.0.0.1:5501/Editor/?test=brython
- http://127.0.0.1:5501/Editor/?test=brython&merge=true