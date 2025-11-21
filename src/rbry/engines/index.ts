import  BrythonEngineFactory from "./Brython";
import RBrythonEngineFactory from "./RBrython";

export default class Engines {
    static getBrythonEngine() {
        return  BrythonEngineFactory();
    }
    static getRBrythonEngine() {
        return RBrythonEngineFactory();
    }
}