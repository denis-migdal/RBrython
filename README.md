<div align="center">
  <h1>RBrython (POC)</h1>

  <p>Demonstrating we can represent Python types as clean JS types.</p>
</div>

Principles:
- We should represent data structures to show intend, not behavior.
- We should not change the data (JS) but the operations on it.
- Python should not only work in JS, but also be easily written in JS.
- Write corelib as much as possible in python (so that we can change impl) ?

Objectifs:
- prove that Python type can be represented in a JS-compatible way.
- build Python classes as a JS class.
- use existing JS classes.

Non-objectifs:
- performances: if you want more performant, use SBrython or write some parts in JS (not recommended).
- libs: RBrython focuses on the core Python features.

Parts:
- Parser : transforms Python code into AST.
- Typer/Checker : deduce type into the AST.
- Optimizer : optimise AST (add new node types).
- Emitter+Runtimelib : produce the code.
- Corelib : standard Python structures (written in Python if possible).
- stdlib : standard Python libs.

Dependencies:
- AST (so needs converters if we wish to change).
- Runtime code (may have similar interface, but not garanted).
- Code/Std : write in Python (good) or in vanilla JS (a little less good).

Others:
- dev tools (source map, stubs ) ;
- compiler (rbryc) ;
- documentation.

## Test

Current : 22/~88
+1

- http://127.0.0.1:5501/Editor/?test=brython
- http://127.0.0.1:5501/Editor/?test=brython&merge=true