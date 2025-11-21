## Processes

RBrython <b>(engines)[../../runner/engine.md]</b> convert Python code into JavaScript through the following processes:
1. <b>[parser](../../parser/index.md)</b>: parse the Python code (<i>uses Brython for now</i>).
2. <b>[emitter](../../emitter/index.md)</b>: generate JavaScript code from the parsed code.
3. <b>[runner](../../runner/index.md)</b>: enable to run the generated JavaScript code.

💡 The following processes might be implemented in the future:
- <b>checker</b>: deduce and check typehints in the parsed code (<i>not implemented</i>).
- <b>[optimizer](.../../optimizer/index.md)</b>: optimize the generated JavaScript code (<i>not implemented</i>).

## Libraries

RBrython distinguishes 3 spaces:
- <b>kernel</b>: a Python system as bare as it can be.
- <b>core</b>: kernel + Python builtin symbols (i.e. includes the <b>[runlib](../../runlib/index.md)</b>).
- <b>modules</b>: standard and user Python modules.

RBrython also provides the following libraries:
- <b>[runlib](../../runlib/index.md)</b>: runtime helpers used by the generated JavaScript code.
- <b>[macros](../../macros/index.md)</b>: a kind of Python function inlined during emission.
- <b>[corelib](../../corelib/index.md)</b>: Python implementation of builtin Python symbols.