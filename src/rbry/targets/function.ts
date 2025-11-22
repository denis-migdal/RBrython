import { JSCode } from "./interface";

export function FunctionTarget(jscode: JSCode) {
    return `"use strict";${jscode.jscode}return {${jscode.exported.join(", ")}};`;
}