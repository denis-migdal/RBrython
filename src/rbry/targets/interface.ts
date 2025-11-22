export type JSCode = {
    name    : string,
    jscode  : string,
    imported: string[],
    exported: string[],
}

export type Target = (jscode: JSCode) => string;