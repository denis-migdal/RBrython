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

### Brython

- `--emitter brython`: use [brython](https://github.com/brython-dev/brython):
    - fully python-compliant, but slower.
    - interactions with JavaScript might not behave well in some edge cases.
    - might not be compatible with all the other options.

### Mode

`--mode debug|test|prod`: (default: `debug`).

See [RBrython mode](../../../?tab=readme-ov-file#mode).


### Target

`--target raw|function|global|module`: (default: `raw`).

See [RBrython target](../../../?tab=readme-ov-file#target).

#### Export

`--export NONE|GLOBAL|MODULE|RETURN|BRYTHON`: (default: `NONE`).

See [RBrython export](../../../?tab=readme-ov-file#export).

#### Sync

`--sync`.

See [RBrython sync](../../../?tab=readme-ov-file#sync).

### Optimizations

`--opti none|safe|unsafe`: (default: `safe`).

See [RBrython optimizations](../../../?tab=readme-ov-file#optimizations).

## Note: For Brython ?

```ts
__BRYTHON__.imported["exec"] = {};
__BRYTHON__.frames_stack = [];
```