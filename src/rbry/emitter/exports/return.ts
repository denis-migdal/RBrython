export default function returnExport(_: string, exported: string[]) {
    return `\nreturn {${exported.join(", ")}};`;
}