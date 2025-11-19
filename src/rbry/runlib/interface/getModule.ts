export default function getModule(name: string) {
    if( name === "JS")
        return globalThis; //TODO...

    throw new Error(`module ${name} not found`);
}