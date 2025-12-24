export default function isClass(o: unknown) {

    if( o === Symbol)
        return false;
    
    // from https://stackoverflow.com/questions/526559/testing-if-something-is-a-class-in-javascript
    return Object.getOwnPropertyDescriptors(o)?.prototype?.writable === false;

}
// + https://github.com/brython-dev/brython/issues/2513