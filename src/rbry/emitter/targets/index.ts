import { default as BrythonTarget } from "./brython";
import { default as FunctionTarget } from "./function";
import { default as ModuleTarget } from "./module";
import { default as RawTarget } from "./raw";

const Targets = {
    raw     : RawTarget,
    function: FunctionTarget,
    module  : ModuleTarget,
    brython : BrythonTarget
}

export default Targets;