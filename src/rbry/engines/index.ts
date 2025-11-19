import  BrythonEngine from "./Brython";
import RBrythonEngine from "./RBrython";

export default class Engines {
    static getBrythonEngine() {
        return new BrythonEngine();
    }
    static getRBrythonEngine() {
        return new RBrythonEngine();
    }
}