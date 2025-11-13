import { ParsedCode } from "../ast/types";

export default abstract class Runner {
    abstract run(pycode: string): void;

    // low level
    abstract parse(pycode: string ): ParsedCode;
    abstract emit (ast: ParsedCode): string;
    abstract loadAsFunction(jscode: string): () => void;
}