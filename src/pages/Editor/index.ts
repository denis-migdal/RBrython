import BenchRunner, { BenchStats } from "./utils/BenchRunner";
import { BryEngine, RBryEngine } from "./utils/engine";
import printBenchStats from "./utils/printBenchStats";

import test_suite from "../../tests/py";
import { $RB } from "@RBrython/rbry/runlib";
import { Targets } from "@RBrython/libs/RBrython-all";

const NB_REPEAT = 3;

const brython_tests = [
    'basic test suite',
    'numbers',
//    "classes" // ~726
//    "strings",
//    "string methods"
];
// strings ~616
// list    ~345
// dicts   ~205
// sets    ~224
// bytes   ~229

// generators ~972...

const search = new URLSearchParams( location.search );
const test_name = search.get("test");
//const merge     = __SBRY_MODE__ === "test"; // Benchmark
const merge     = search.get("merge") === "true" ? true : false;
const parser    = search.get("parser") === "false" ? false : true;
const DEFAULT_COMPAT = (search.get("compat") ?? "NONE");// as typeof __SBRY_COMPAT__;

////////////////////////////////////////////////////////////////:

window.onerror = (...args) => {
	console.log(args);
	// msg
	// stack
	// 
}

// ==================================================================

// benchmark configuration...
function createBench() {

    const bench = new BenchRunner();

    bench.addEngine( "Brython"    ,  BryEngine)
            .addEngine("RBrython", RBryEngine);

    bench.addStep("parse", (engine, ctx) => {
        ctx.ast = engine.parse(ctx.pycode);
    })
            .addStep("emit",  (engine, ctx) => {
        ctx.jscode = engine.emit(ctx.ast, {target: Targets.function,
                                             sync: true});
    })
            .addStep("load",  (engine, ctx) => {
        ctx.fct = engine.loadAsSyncFunction(ctx.jscode);
    });

    for(let i = 0; i < NB_REPEAT; ++i)
        bench.addStep(`execute${i}`,  (_, ctx) => { ctx.fct($RB); }); // own $RB
    
    bench.addStat("nbTokens", (ctx) => {
        return $B.tokenizer(ctx.pycode, '_').length;
    })
    bench.addStat("nbFiles", (ctx) => {
        return 1;
    })
    bench.addStat("jslen", (ctx) => {
        return ctx.jscode?.length;
    })
    bench.addStat("asserts_count", (ctx) => {
        const n = assert_count / NB_REPEAT;
        assert_count = 0;
        return n;
    })
    bench.addStat("asserts_fail", (ctx) => {
        const n = assert_fail / NB_REPEAT;
        assert_fail = 0;
        return n;
    })

    let assert_count = 0;
    let assert_fail  = 0;

    // @ts-ignore
    $RB.assert = function(cond) {
        ++assert_count;
        if( ! cond )
            ++assert_fail;
    }

    bench.resetStats();

    return bench;
}

// ==================================================================

function resetGUI() {
    sbry_output.classList.remove('error', 'success');
    sbry_output.textContent = "";

    bry_output.classList.remove('error', 'success');
    bry_output.textContent = "";

}
function printResult( target: Element,
                      result: BenchStats,
                        base: BenchStats) {

    target.textContent = printBenchStats(result, base);
    let hasError = result.stats.asserts_fail !== 0;
    
    if( result.errors.length > 0) {

        hasError = true;
        target.textContent += "\n" + result.errors.map( e => {
            let msg = e.message;
            if( msg === "")
                // @ts-ignore
                msg = e.args[0]; // Brython errors.
            return msg;
        }).join('\n');
        //TODO: show code...
    }

    target.classList.toggle("error", hasError); 
    target.classList.toggle("success", !hasError); 
}

function run(pycodes: string[]|Record<string,string>) {

    resetGUI();

    bench.resetStats();

    //TODO: handle errors...
    const keys = Object.keys(pycodes);
    for(let i = 0; i < keys.length; ++i) {
        // @ts-ignore
        bench.bench({pycode: pycodes[keys[i]]});
    }

    const results = bench.getStats();

    for(let i = 0; i < keys.length; ++i) {

        const res = results.RBrython.tests[i];

        const hasError = !!(res.errors.length || res.stats.asserts_fail);
        const test = [...select.children].find( o => o.getAttribute("value") === res.ctx.pycode);
        if( test !== undefined) {
            test.classList.toggle("success", ! hasError);
            test.classList.toggle("error"  ,   hasError);
        }
    }

    if( pycodes.length === 1) {
          python_input.textContent = results.Brython.ctx.pycode;
         bry_js_output.textContent = results. Brython.ctx.jscode;
        sbry_js_output.textContent = results.RBrython.ctx.jscode;
    }

    printResult(bry_output , results[ "Brython"], results["RBrython"]);
    printResult(sbry_output, results["RBrython"], results[ "Brython"]);  
}

// ==================================================================
// Get test suite....

function generateTestSuite(test_name: string, merge: boolean): string[] {
    
    let tests: string[] = [test_name];
    if( test_name === "brython" )
        tests = brython_tests;

    let fullcode = "";
    const pycodes = new Array<string>();
    let id = -1;

    const configs = ["NONE"];
    /*
    const configs: typeof __SBRY_COMPAT__[] = __SBRY_COMPAT__ === "NONE"
        ? ["NONE"]
        : ["NONE", "PERF"]; //, "FULL"];
    */

    //TODO: split merge & execute...

    // build merged code
    tests: for(let i = 0; i < tests.length; ++i) {

        const subtests = test_suites[tests[i]];
        const substats = subTestsStats[tests[i]];

        for(let j = 0; j < subtests.length; ++j) {

            ++id;

            //const stats = substats[j];
            //results.total_lines       += stats.total;
            //results.nb_excluded_lines += stats.excluded;

            for(const config of configs) {

                //globalThis.__SBRY_COMPAT__ = config as any;
                //TODO: second exclude...

                let code = subtests[j];

                if( code === "")
                    continue;

                code = filterCode(code);
        
                if( merge ) {
                    const indented_code = code.split('\n').map(e => `    ${e}`).join('\n');
                    fullcode += `def _${id}():\n${indented_code + "pass"}\n_${id}()\n`;
                } else {
                    pycodes.push(code);
                }
            }
        }
    }

    if(merge)
        return [fullcode];

    return pycodes;
}

async function loadExcludeList() {
    const exclude_list = await (await fetch('/assets/exclude_list.txt')).text();
    return Object.fromEntries( exclude_list.split('#').slice(0).map(e => {

        let lines = e.split('\n');
        let name = lines[0].slice(1);

        let exclude = lines.slice(1).filter(e => e[0] !== '/' && e.length !== 0).map( x => {
            const e = x.split('-');
            if( e.length === 1) {
                if( e[0] === '*')
                    return e[0];
                return parseInt(e[0]);
            }
            return [parseInt(e[0]), parseInt(e[1])]
        });

        return [name, exclude];
    }) );
}

async function loadTests(...names: string[]) {

    const tests: Record<string, string[]> = {};

    for(let i = 0; i < names.length; ++i)
        tests[names[i]] = await loadSubTests(names[i]);

    return tests;
}

async function loadSubTests(test_name: string, exclude = exclude_list) {

    const code = await (await fetch(`/assets/unittests/${test_name}.py`)).text();

    subTestsStats[test_name] = [];

    const parts = code.split('\n#');

    parts[0] = parts[0].slice(1);

    return parts.map( (t,idx) => {

        let   lines = t.split('\n');
        const name  = lines[0].trim();
        lines[0] = "# " + test_name + "." + name + " (" + (idx+1) + "/" + parts.length + ")";
        const fullname = `${test_name}.${name}`;

        let excl = exclude[fullname];
        if( excl === undefined)
            excl = exclude[`${test_name}.*`];

        lines = filter(lines, excl);

        let nbEmptyLines = 0;
        for(let i = 1; i < lines.length; ++i)
            if(lines[i].trim() === '')
                ++nbEmptyLines;
        
        let nbExcluded = 0;
        for(let i = 1; i < lines.length; ++i) {
            if( lines[i][0] === '#' ) {
                if( lines[i].slice(1).trim() === '' ) // commented empty line
                    ++nbEmptyLines;
                else
                    ++nbExcluded
            }
        }

        let code_len = lines.length - 1 - nbEmptyLines;

        subTestsStats[test_name].push({
            excluded: nbExcluded,
            total   : code_len
        });
    
        if(code_len === nbExcluded)
            return "";

        return lines.join('\n') + '\n';
    });
}

function filter(lines: string[], list: (number|"*"|number[])[]) {

    list ??= [];
    
    let result = lines.map( (l, idx) => {
        idx = idx + 1;
        let excluded = list.find( (v) => {
            if( v === '*')
                return true;
            if( idx === v)
                return true;
            if( Array.isArray(v) && v[0] <= idx && v[1] >= idx)
                return true;
            return false;
        }) !== undefined;
        
        if( excluded )
            return `# ${l}`;
        return l;
    });

    return result;
}

// ===============================================================

const subTestsStats: Record<string, {total: number, excluded: number}[]> = {};
const exclude_list = await loadExcludeList();
const test_suites  = await loadTests(...brython_tests); // cf end of file for available tests

// ===============================================================

const  bry_output  = document.querySelector ( '.brython_output')!;
const sbry_output  = document.querySelector('.rbrython_output')!;
const python_input = document.querySelector<HTMLInputElement>('#python')!;

const python_output = document.querySelector(".python_ouput")!;
const ast_output    = document.querySelector("#ast")!;
const sbry_js_output= document.querySelector("#rbry_js")!;
const  bry_js_output= document.querySelector("#bry_js")!;

const sbry_print = (...args: any[]) => {
    console.log("[SBRY]", ...args);
}

python_input.addEventListener("input",
    () => {
        const code = python_input.value;
        localStorage.setItem('rbrython_code', code);
        run([code]);
    });

python_input.addEventListener('keydown', (ev) => {

    if(ev.code === "Tab") {
            ev.preventDefault();
    
            let beg = python_input.selectionStart!;
            let end = python_input.selectionEnd!;
    
            const txt = python_input.value;
            const preText  = txt.slice(0  , beg);
            const postText = txt.slice(end, txt.length);
    
            python_input.value = preText + "    " + postText; // input tab key
            
            const pos = beg+4;
            python_input.setSelectionRange(pos, pos);
        }
    });

const select = document.querySelector<HTMLSelectElement>('#tests')!;

const defaultOpt = new Option("----", undefined, true, true);
defaultOpt.toggleAttribute('disabled');
select.append( defaultOpt );

for(let name in test_suite)
    select.append( new Option(name, test_suite[name as keyof typeof test_suite]) );


function filterCode(code: string) {

    const codes = code.split("\n");
    for(let l = 1; l < codes.length; ++l) {
        const idx = codes[l].indexOf('#');
        if( idx <= 0)
            continue;
        const config = JSON.parse( codes[l].slice(idx+1).trim());
        if( config.COMPAT !== DEFAULT_COMPAT )
            codes[l] = "#" + codes[l];
        else
            codes[l] = codes[l].slice(0, idx).trimEnd();
    }

    return codes.join('\n');
}

select.addEventListener('change', () => {

    const code = filterCode(select.value);

    python_input.value = code;
    localStorage.setItem('rbrython_code', code);
    run([code]);
    
});

for(let i = 0; i < brython_tests.length; ++i) {

    const subtests = test_suites[ brython_tests[i] ];

    for(let j = 0; j < subtests.length; ++j) {

        const code = subtests[j];

        if( code === "")
            continue;

        const name = code.slice(2 , code.indexOf("\n") );

        const opts = new Option(name, code);
        select!.append( opts );
    }
}

// =====================================================================

const bench = createBench();
let initialRun: string[]|Record<string, string>;

if( test_name === "rbrython" ) {
    initialRun = test_suite;
} else if( test_name !== null )
    initialRun = generateTestSuite(test_name, merge);
else
    initialRun = [python_input.value = localStorage.getItem('rbrython_code') ?? ""];

run( initialRun );