## Run Python code

- `run(pycode: string)`: runs the given python code.
    1. `parse(pycode: string): AST`: transforms the python code into the AST.
    2. `emit(ast: AST): string`: transforms the AST into JS code.
    3. `asFunction(jscode: string): () => void`: transforms the JS code as a callable function.