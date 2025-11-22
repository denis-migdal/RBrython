import { JSCode } from "./interface";

export function GlobalTarget(jscode: JSCode) {
    return `${jscode.jscode}globalThis.${jscode.name} = {${jscode.exported.join(", ")}};`;
}