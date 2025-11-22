type Pos = {
    line: number,
    col : number
}

export default class SourceMap {

    readonly pysource: string;
    readonly pyname: string;
    readonly jsname: string;
    mappings: string = "";

    constructor(jsname: string, pyname: string, pysource: string) {
        this.jsname   = jsname;
        this.pyname   = pyname;
        this.pysource = pysource;
    }

    // generated
    js_pos: Pos = {
        line: 0,
        col : 0
    };
    // source
    py_pos: Pos = {
        line: 0,
        col : 0
    }

    addMapping(js: Pos, py: Pos) {

        if( this.js_pos.line > js.line
         || this.js_pos.line === js.line && this.js_pos.col >= js.col)
            throw new Error("Out of order");

        if( js.line !== this.js_pos.line) {
            this.mappings += ";".repeat(js.line - this.js_pos.line);
            this.js_pos.line = js.line;
            this.js_pos.col  = 0;
        } else if(this.mappings.length) {
            this.mappings += ",";
        }

        // note unmapped = encode(js.col, this.js_pos.col)
        this.mappings += encode(js.col , this.js_pos.col )
                       + encode(0,0)
                       + encode(py.line, this.py_pos.line)
                       + encode(py.col , this.py_pos.col);

        this.py_pos.line = py.line;
        this.py_pos.col  = py.col;
        this.js_pos.col  = js.col;
    }

    addLine() {

        this.mappings += encode(0, this.js_pos.col) + ";";

        ++this.js_pos.line;
        this.js_pos.col = 0;
        
    }

    toInline() {
        return "//# sourceMappingURL=data:text/plain;base64,"
               + btoa(this.toFile());
    }

    toFile() {
        return JSON.stringify({
            version       : 3,
            file          : this.jsname,
            sourceRoot    : "",
            sources       : [this.pyname],
            sourcesContent: [this.pysource],
            names         : [],
            mappings      : this.mappings,
            ignoreList    : [0]
        });
    }
}

const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

function encode(n: number, prev: number) {

    n -= prev;
    const is_neg = n < 0;
    if( is_neg )
        n = -n;

    n <<= 1;
    if( is_neg )
        ++n;

    let result = "";
    let cont: boolean;

    // now encode n from least significant to most significant (continuation bit 6th).
    do {
        cont = n > 0x1F;
        result += b64[n & 0x1F + +cont * 0x20];
        n >>= 5;
    } while(cont)


    return result;
}