import { JSCode } from "./interface";

export function ModuleTarget(jscode: JSCode) {
    return `${jscode.jscode}export {${jscode.exported.join(", ")}};`;
}