const handlers = {
    "FunctionDef": require("./definitions/FunctionDef").default,

    "Compare": require("./operators/Compare").default
}

export default handlers