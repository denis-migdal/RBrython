import { __BRYTHON__ } from "@RBrython/assets/brython";
import { modules } from "@RBrython/rbry/runners/RBrythonGlobalRunner";

export default function getModule(name: string) {

    // h4ck
    const module = modules[name];
    if( module !== undefined )
        return module;

    if( name in globalThis)
        return modules[name] = globalThis[name as keyof typeof globalThis];

    // TODO...
    if( "__BRYTHON__" in globalThis) {
        if( name in __BRYTHON__.imported)
            return modules[name] = __BRYTHON__.pyobj2jsob(__BRYTHON__.imported[name]);
    }
    
    throw new Error(`module ${name} not found`);
}
    