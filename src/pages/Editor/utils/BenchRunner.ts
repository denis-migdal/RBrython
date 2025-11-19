// initial data
// add steps
// get result
// get metrics...

import Engine from "@SBrython/rbry/engines/interface";

export type BenchStats   = {
    steps : {name: string, time: number}[];
    ctx   : Record<string, any>
    errors: Error[],
    stats : Record<string, number>
}
export type BenchResults = Record<string, BenchStats>;

export default class BenchRunner {

    readonly steps  : {name: string, fct: (engine: Engine, context: Record<string, any>) => void}[] = [];
    readonly engines: {name: string, engine: Engine}[] = [];
    readonly   stats: {name: string, fct: (ctx: Record<string, any>) => number}[] = [];

    addStat(name: string, fct: (ctx: Record<string, any>) => number) {
        this.stats.push({name, fct});
    }

    addEngine(name: string, engine: Engine) {
        this.engines.push({name, engine});
        return this;
    }
    addStep(name: string, fct: (engine: Engine, context: Record<string, any>) => void) {
        this.steps.push({name, fct});
        return this;
    }

    #results: BenchResults | null = null;
    resetStats() {
        this.#results = {};
        for(let r = 0; r < this.engines.length; ++r) {
            this.#results[this.engines[r].name] = {
                steps : new Array(this.steps.length),
                ctx   : {},
                errors: [],
                stats : {}
            };
            for(let i = 0; i < this.steps.length; ++i)
                this.#results[this.engines[r].name].steps[i] = {
                    name: this.steps[i].name,
                    time: 0
                }
            for(let i = 0; i < this.stats.length; ++i)
                this.#results[this.engines[r].name].stats[this.stats[i].name]
                    = 0;
        }
    }
    getStats() {
        return this.#results!;
    }

    bench(ctx: Record<string, any>) {

        if( this.#results === null ) {
            this.resetStats();
        }
        //TODO tokenize (stats).
        //TODO print

        const results = this.#results!;

        for(let r = 0; r < this.engines.length; ++r) {
            const engine = this.engines[r].engine;
            const result = results[this.engines[r].name];
            const context = result.ctx = {...ctx};

            try {

                for(let i = 0; i < this.steps.length; ++i) {

                    const f = this.steps[i].fct;

                    const beg = performance.now();
                    f(engine, context);
                    const end = performance.now();
                    
                    result.steps[i].time += end - beg;
                }

                for(let i = 0; i < this.stats.length; ++i) {
                    result.stats[this.stats[i].name] += this.stats[i].fct(context);
                }

            } catch(e: unknown) {
                result.errors.push( e as Error );
            }
        }
    }
}