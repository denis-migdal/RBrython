import Engine from "@RBrython/rbry/engines/RBrython/";

function fix_indent(text: string) {
    
    const start = text.search(/[\S]/);
    const line  = text.lastIndexOf("\n", start);

    if( line === -1) // we assume no indentations.
        return text;

    const indent = start - line - 1;
    return text.slice(1).split("\n").map( l => l.slice(indent)).join("\n");
}

const engine = new Engine();
const scripts = document.querySelectorAll("script[type='text/rbrython']");

for(let i = 0; i < scripts.length; ++i)
    engine.run( fix_indent(scripts[i].textContent!) );

export default Engine;