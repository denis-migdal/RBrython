<div align="center">
  <h1>RBrython (POC)</h1>

  <p>Testing a new architecture for Brython</p>
</div>

RBrython enables to execute Python codes in the Browser. To do so RBrython converts Python codes into JavaScript, either in the browser, or ahead of time.

RBrython perfectly integrates with existing Python and Web development tools, while enabling transparent interactions with existing JavaScript/TypeScript codes/libraries, as well as with the browser APIs.

With RBrython, you can choose whether the conversion should favorise Python compliance or performances.

## Running Python code in the Browser

There are 3 ways to run Python code with RBrython:
1. include Python script tags into your WebPage (the simplest).
2. use the RBrython engine in JS (the most customizable).
3. convert the Python code ahead of time (the fatest).

### Method 1: Python script tags

Running Python code in the Browser is as simple as adding your Python code in a script tag (click [here](https://rbrython.migdal.ovh/tests/ScriptRunner) to test):

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="/assets/brython.min.js"></script>
        <script type="module" src="/libs/ScriptRunner/index.js"></script>
        <script type="text/rbrython">
            from JS import document

            document.body.textContent = "ok"
        </script>
    </head>
</html>
```

⚠ Currently, RBrython is depending on Brython to convert Python into JS. Therefore you'll need to include Brython.

💡 You'll find the `/libs/ScriptRunner/index.js` script inside the `dist/prod/` directory.

💡 In order to access the browser API, simply import the JS module in your Python code.

### Method 2: RBrython engine

You can also run Python code with a RBrython engine:

```html
<!DOCTYPE html>
<html>
    <head>
        <script src="/assets/brython.min.js"></script>
        <script type="module">
            import Engine from "/libs/RBrython-dev/index.js";

            const engine = new Engine();
            engine.run(
`from JS import document

document.body.textContent = "ok"`
            );
        </script>
    </head>
</html>
```

See [this page](./docs/engine/index.md) to learn how to use Brython engines.

⚠ Currently, RBrython is depending on Brython to convert Python into JS. Therefore you'll need to include Brython.

💡 You'll find the `/libs/RBrython-dev/index.js` script inside the `dist/prod/` directory.

### Method 3: Ahead of time



## Architecture

<i>Note: some features are not yet implemented but can be found in [SBrython](https://github.com/denis-migdal/SBrython).</i>

RBrython [engine](./docs/runner/engine.md) distinguishes several processes:
- <b>[parser](./docs/parser/index.md)</b>: transform Python code into AST (<i>for now uses Brython</i>).
- <b>checker</b>: deduce and check typehints in the AST (<i>not implemented</i>).
- <b>[optimizer](./docs/optimizer/index.md)</b>: transform the AST using deduced types as well as some assumptions (<i>not implemented</i>).
- <b>[emitter](./docs/emitter/index.md)</b>: generate JS code from the AST.
- <b>[runner](.)</b>: run generated JS code.

Theses processes depends on an [AST structure](./docs/ast/index.md), for now we use Brython's.

RBrython also provides the following libraries:
- <b>[runlib](./docs/runlib/index.md)</b>: a set of helpers used to execute the generated JS code.
- <b>[corelib](./docs/corelib/index.md)</b>: an implementation of builtin Python functions and structures.
- <b>stdlib</b>: an implementation of standard Python libraries (<i>out of scope</i>).

RBrython distinguishes two parts:
- <i>kernel</i>: Python without the corelib.
- <i>core</i>: Python with the corelib.

RBrython provides the following tools:
- sourcemaps (<i>not implemented</i>) ;
- JS API stubs (cf /stubs directory) ;
- compiler (<i>not implemented</i>) ;
- a documentation.

<i>Note: most of the code outside of `src/rbry` correspond to SBrython code that hasn't been cleaned yet. They are used as references during the development of RBrython.</i>

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

### Principle 5

RBrython should document as much as possible to help third party interventions. RBrython will also try documenting equivalent Brython features.

## Test

Current : 22/~88
+1

- http://127.0.0.1:5501/Editor/
- http://127.0.0.1:5501/Editor/?test=rbrython
- http://127.0.0.1:5501/Editor/?test=rbrython&merge=true


Tests from : https://github.com/brython-dev/brython/tree/master/www/tests