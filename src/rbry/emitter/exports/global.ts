export default function globalExport(name: string, exported: string[]) {
    return `  globalThis.${name} = {${exported.join(", ")}};\n`;
}