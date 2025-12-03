import { HMacro } from "@RBrython/rbry/optimizers";

const hmacros = {
    NL     : require("./NL")  .default as HMacro,
    BB     : require("./BB")  .default as HMacro,
    BE     : require("./BE")  .default as HMacro,
    bool   : require("./bool").default as HMacro,
    getTmp : require("./getTmp").default as HMacro,
    saveTmp: require("./saveTmp").default as HMacro
}

export default hmacros;