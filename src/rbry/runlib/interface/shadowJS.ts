export const SHADOW_JS: Record<string, any> = {}

export default function shadowJS(value: string, ro: boolean = false) {
    const prefix = ro ? "RO" : ""
    return (cls: any) => (SHADOW_JS[prefix + value] = cls);
}