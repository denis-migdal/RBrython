import { BrythonTarget } from "./brython";
import { FunctionTarget } from "./function";
import { GlobalTarget } from "./global";
import { ModuleTarget } from "./module";
import { RawTarget } from "./raw";

const Targets = {
    raw     : RawTarget,
    function: FunctionTarget,
    global  : GlobalTarget,
    module  : ModuleTarget,
    brython : BrythonTarget
}

export default Targets;