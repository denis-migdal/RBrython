const handlers = {
    "FunctionDef": require("./definitions/FunctionDef").default,

    "Constant": require("./vars/Constant").default,
    "UnaryOp": require("./operators/UnaryOp").default,
    "Compare" : require("./operators/Compare").default
}

export default handlers