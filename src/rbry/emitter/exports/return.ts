export default function returnExport(_: string, exported: string[]) {
    return `  return {${exported.join(", ")}};\n`;
}