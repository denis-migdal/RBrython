export default function moduleExport(_: string, exported: string[]) {
    return `  export {${exported.join(", ")}};\n`;
}