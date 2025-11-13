import { BenchStats } from "./BenchRunner";

function tformat(time: number, unit: string) {
    return time.toFixed(3).padStart(7) + unit;
}

function tdiff(a: number, b: number) {

    const c = a/b;

    if( c === 1)
        return "   =   ";

    if( c > 1 )
        return "x" + c.toFixed(2).padStart(6);

    return "-" + (-(100*a/b - 100)).toFixed(2).padStart(5) + "%";
}

export default function printBenchStats(stats: BenchStats, base: BenchStats) {

    //const nb_tokens = results.nb_tokens;
    //const A = results[a];
    //const B = results[b];
    
    let report = "";

    /*
    const nb_lines    = results.total_lines;
    const nb_excluded = results.nb_excluded_lines;
    const nb_done     = nb_lines - nb_excluded;

//    report += "Status         : SUCCESS\n";
    report += `Tested         : ${nb_done}/${nb_lines} (${(nb_done/nb_lines*100).toFixed(2)}%)\n`;*/

    const nb_tokens = stats.stats.nbTokens;
    report += `Py code: ${nb_tokens} tokens (${stats.stats.nbFiles} file)\n`;
    
    report += "JS code: " + tdiff(stats.ctx.jscode?.length,
                                  base.ctx.jscode?.length) + "\n";
    report += "\nTimes:\n"


    const tcoef = 100_000 / nb_tokens / 1000;

    for(let i = 0; i < stats.steps.length; ++i) {

        const name = stats.steps[i].name;
        const time = stats.steps[i].time;
        const cmp  =  base.steps[i].time;

        report += `- ${name.padEnd(7)}\t`
                    + tformat(time * tcoef, "s")
                    + " ["
                    + tdiff(time, cmp)
                    + "] "
                    + tformat(time, "ms")
                    + "\n";
    }

    return report;
}