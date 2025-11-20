import { modules } from "@RBrython/rbry/runners/RBrythonGlobalRunner";

export default function getModule(name: string) {

    // h4ck
    const module = modules[name];
    if( module === undefined )
        throw new Error(`module ${name} not found`);

    return module;
}
    