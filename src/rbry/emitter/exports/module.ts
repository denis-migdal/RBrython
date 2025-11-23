export default function moduleExport(_: string, exported: string[]) {
    return `\nexport {${exported.join(", ")}};`;
}