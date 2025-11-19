## Run Python code

Several engines availables:
- `BrythonEngine` : use Brython.
- `RBrythonEngine` : use RBrython.

- `run(pycode: string)`: runs the given python code.
    1. `parse(pycode: string): ParsedCode`: transforms the python code into the AST.
    2. `emit(ast: ParsedCode): string`: transforms the AST into JS code.
    3. `loadAsFunction(jscode: string): () => void`: transforms the JS code as a callable function.

## Configuration
