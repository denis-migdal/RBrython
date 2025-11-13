import { AST } from "../ast/types";
import emit from "../emitter";
import parse from "../parser";

export default class Runner {

    parse(pycode: string): AST {
        return parse(pycode, "_");
    }
    emit(ast: AST) {
        return emit(ast);
    }
    asFunction(jscode: string) {
        return new Function(jscode);
    }

    run(pycode: string) {
        this.asFunction(this.emit(this.parse(pycode)))();
    }
}