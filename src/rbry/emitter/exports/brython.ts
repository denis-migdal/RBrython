export default function brythonExport(name: string, exported: string[]) {
    return `\n$B.imported["${name}"] = $B.jsobj2pyobj({${exported.join(',')}});`;
}