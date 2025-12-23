export const SHADOW_JS: Record<string, any> = {}

export default function shadowJS(value: string) {
    return (cls: any) => (SHADOW_JS[value] = cls);
}