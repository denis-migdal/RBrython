// initial data
// add steps
// get result
// get metrics...

import Engine from "@RBrython/rbry/engines/interface";

export type BenchStats   = {
    tests : ResultOne[],
    steps : {name: string, time: number}[],
    errors: Error[],
    stats : Record<string, number>
}
export type BenchResults = Record<string, BenchStats>;

type ResultOne = {
    ctx   : Record<string, any>,
    steps : {name: string, time: number}[],
    errors: Error[],
    stats : Record<string, number>
}

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
                tests : [],
                steps : new Array(this.steps.length),
                errors: [],
                stats : {},
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

    protected benchOne(engineId: number, ctx: Record<string, any>) {

        const engine = this.engines[engineId].engine;

        const resultOne: ResultOne = {
            ctx,
            steps : new Array(this.steps.length),
            errors: [],
            stats : {}
        };

        try {

            for(let i = 0; i < this.steps.length; ++i) {

                const f = this.steps[i].fct;

                const beg = performance.now();
                f(engine, ctx);
                const end = performance.now();
                
                resultOne.steps[i] = {
                    time: end - beg,
                    name: this.steps[i].name
                }
            }

            for(let i = 0; i < this.stats.length; ++i)
                resultOne.stats[this.stats[i].name] = this.stats[i].fct(ctx);

        } catch(e: unknown) {
            console.warn(e);
            resultOne.errors.push( e as Error );
        }

        return resultOne;
    }

    bench(ctx: Record<string, any>) {

        if( this.#results === null )
            this.resetStats();

        const results = this.#results!;

        for(let r = 0; r < this.engines.length; ++r) {
            const resultEngine = results[this.engines[r].name];

            const resultOne = this.benchOne(r, {...ctx});

            // merge
            resultEngine.tests.push(resultOne);
            resultEngine.errors.push(...resultOne.errors);
            for(let i = 0; i < this.steps.length; ++i)
                resultEngine.steps[i].time += resultOne.steps[i]?.time ?? 0;

            for(let i = 0; i< this.stats.length; ++i) {
                resultEngine.stats[this.stats[i].name] += resultOne.stats[this.stats[i].name]?? 0;
            }

        }
    }
}