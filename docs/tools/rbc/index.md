The `rbc` (RBrython Compiler) command converts Python files into JavaScript files. Its basic usage is rather simple:
```shell
./tools/rbc foo.py
```

💡 Use the `--help` option to print `rbc`'s usage.

⚠ `Deno` must be installed (cf [documentation](https://docs.deno.com/runtime/getting_started/installation/)).

⚠ On Windows, `rbc` might require WSL.

## Input

By default, `rbc` takes Python files as arguments.

However, if `-` is given instead, `rbc` will read the standard input, and will generate the JavaScript code into the standard output, e.g.:
```shell
$ echo "1+1" | ./tools/rbc -
$RB.op(1n, "add", 1n);
```

💡 If a directory is given, `rbc` will convert all `.py` and `.rbry` files contained (directly or indirectly) in this directory.

💡 The `--watch` option update the generated JavaScript files when the associated original Python file is modified.

💡 The `--verbose` option print what `rbc` is doing.

## Output

By default, `rbc` generate JavaScript files with the same names and path as the original Python files.

You can however change this behavior by providing an output directory in which the generated JavaScript files will be saved:
```bash
./tools/rbc --outDir $DST_DIR -
```

### Mode

`--mode debug|test|prod`: (default: `debug`).

See [RBrython mode](../../../?tab=readme-ov-file#mode-not-implemented).

### Compatibility (not implemented)

- `--compat NONE|PERF|FULL|BRYTHON`: the level of Python compliance (default: `NONE`).

- `compat`: compatibility level with the Python standard:
   - `NONE`: generate clean and fastest JS/TS code, doesn't require a runtime library (***default***).
   - `PERF`: generate unclean and fast JS/TS code, requires a small runtime library.
   - `FULL`: fully compliant with the Python standard (**not implemented yet**).
   - `BRYTHON`: use [brython](https://github.com/brython-dev/brython), fully python-compliant, slower, JS-Python interactions more incertains, currently not compatible with other options.

### Export (not implemented)

- `--export NONE|ES6|SBRY|GLOBAL`: produce ES6 modules, or SBrython modules (default: `NONE`).

- `export`:
    - `NONE`: can't import/export symbols (***default***).
    - `ES6`: produce ES6 modules (recommanded for AoT conversions).
    - `SBRY`: produce SBrython modules (recommanded for conversions in the Browser).
    - `GLOBAL` : store exported symbols in `__SBRY_LAST_EXPORTED__`.

## Note: For Brython ?

```ts
__BRYTHON__.imported["exec"] = {};
__BRYTHON__.frames_stack = [];
```