export default function brythonExport(name: string, exported: string[]) {
    return `  $B.imported["${name}"] = $B.jsobj2pyobj({${exported.join(',')}});\n`;
}