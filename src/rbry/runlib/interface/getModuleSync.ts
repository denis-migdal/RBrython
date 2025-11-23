import { modules } from "@RBrython/rbry/runners/RBrythonGlobalRunner";

export default function getModuleSync(name: string) {

    // h4ck
    const module = modules[name];
    if( module !== undefined )
        return module;

    if( name in globalThis)
        return modules[name] = globalThis[name as keyof typeof globalThis];

    // TODO...
    if( "__BRYTHON__" in globalThis) {
        // @ts-ignore
        if( name in __BRYTHON__.imported)
            // @ts-ignore
            return modules[name] = __BRYTHON__.pyobj2jsob(__BRYTHON__.imported[name]);
    }
    
    throw new Error(`module ${name} not found`);
}
    