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
2. use the RBrython engine in JavaScript (the most customizable).
3. convert the Python code ahead of time (the fatest).

💡 You can test the current RBrython version [here](http://rbrython.migdal.ovh/Editor).

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

⚠ Currently, RBrython is depending on Brython to convert Python into JavaScript. Therefore you'll need to include Brython.

💡 You'll find the `/libs/ScriptRunner/index.js` script inside the `dist/prod/` directory.

💡 In order to access the browser API, simply import the JavaScript module in your Python code.

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

See [this page](./docs/engine/index.md) to learn how to use RBrython engines.

⚠ Currently, RBrython is depending on Brython to convert Python into JavaScript. Therefore you'll need to include Brython.

💡 You'll find the `/libs/RBrython-dev/index.js` script inside the `dist/prod/` directory.

### Method 3: Ahead of time

You can also convert Python scripts into JavaScript ahead of time for more performant Web pages:
```bash
./tools/rbc src/assets/AOT.py
```

See [this page](./docs/tools/rbc/index.md) to learn how to use the rbc command.

Depending on the chosen options, you'll need a <i>runner</i> in order to execute the JavaScript code. The runner doesn't require Brython (1.2MB, once compressed 132KB) and is lighter than the full RBrython distribution (currently 52KB instead of 92KB, once compressed, 2.6KB instead of 5KB).

💡 `npm run stats` to recompte file statistics.

Then you can then include the generated script in your webpage:
```html
<!DOCTYPE html>
<html>
    <head>
        <script type="module" src="/libs/Runner/index.js"></script>
        <script type="module" src="/assets/AOT.js"></script>
    </head>
</html>
```

You can also use the runner directly:
```html
<!DOCTYPE html>
<html>
    <head>
        <script type="module">
            import runner from "/libs/Runner/index.js";

            const script = await (await fetch("/assets/AOT.js")).text();
            runner.loadAsFunction(script)();
        </script>
    </head>
</html>
```

See [this page](./docs/runner/index.md) to learn how to use the RBrython runner.

💡 You'll find the `/libs/Runner/index.js` script inside the `dist/prod/` directory.

## Development

### Stubs

Stubs files enable autocompletion and type checking features in your Python editor.

RBrython stubs files are located in the `stubs/` directory. You only need to add this directory to your `PYTHONPATH` in order to use them.

💡 RBrython also offers stubs files for the browser API, though it might be incomplete.

### Browser API

You can access the browser API by simply importing the `JS` Python module.

See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API) for the browser API documentation.

⚠ The MDN documentation codes are written in JavaScript.

### Compatibility (not implemented)

### Mode (not implemented)

RBrython offers several modes:
   - `dev`: performs some checks, keeps some debug informations (***default***).
   - `prod`: intended for production code.
   - `test`: like the `prod` mode, but asserts are kept.

## Contributing

Build commands:
- `npm run watch`: rebuild the development version each time a source file is modified.
- `npm run build`: build the development version.
- `npm run build-prod`: build the production version.
- `./tools/rbc src/rbry/corelib/ --outDir src/rbry/corelib-aot` : convert the corelib files ahead of time for the standard runner.

💡 You can run RBrython test suite in [http://rbrython.migdal.ovh/Editor?test=rbrython](http://rbrython.migdal.ovh/Editor?test=rbrython).

💡 You can launch the RBrython Website in VScode thanks to the live server extension. Else you can launch a simple HTTP server on `/dist/dev/`.

TODO: architecture + writing corelib.

See also the [goal and principles](./docs/dev/principles/index.md).

Google group discussion: https://groups.google.com/g/brython/c/4P4mvgH02UI/m/BNi266d3AgAJ

## Architecture

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

RBrython provides the following tools:
- sourcemaps (<i>not implemented</i>) ;