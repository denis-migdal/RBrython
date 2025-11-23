export default function globalExport(name: string, exported: string[]) {
    return `\nglobalThis.${name} = {${exported.join(", ")}};`;
}