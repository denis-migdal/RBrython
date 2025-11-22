import { JSCode } from "./interface";

export function BrythonTarget(jscode: JSCode) {
    return `${jscode.jscode}\n$B.imported["${jscode.name}"] = $B.jsobj2pyobj({${jscode.exported.join(',')}});`;
}