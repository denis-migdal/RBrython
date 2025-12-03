const handlers = {
    "FunctionDef": require("./definitions/FunctionDef").default,

    "Constant": require("./vars/Constant").default,
    "Compare" : require("./operators/Compare").default
}

export default handlers