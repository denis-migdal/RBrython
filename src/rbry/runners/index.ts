import  BrythonRunner from "./Brython";
import RBrythonRunner from "./RBrython";

export default class Runner {
    static getBrythonRunner() {
        return new BrythonRunner();
    }
    static getRBrythonRunner() {
        return new RBrythonRunner();
    }
}