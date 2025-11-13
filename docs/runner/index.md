## Run Python code

Several runners availables:
- `BrythonRunner` : use Brython.
- `RBrythonRunner` : use RBrython.

- `run(pycode: string)`: runs the given python code.
    1. `parse(pycode: string): ParsedCode`: transforms the python code into the AST.
    2. `emit(ast: ParsedCode): string`: transforms the AST into JS code.
    3. `asFunction(jscode: string): () => void`: transforms the JS code as a callable function.

## Configuration
