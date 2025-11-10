import lit from "../interface/lit";

export class type {
    //TODO...
    __call__(...args: any[]) {

        // @ts-ignore
        const factory = this.prototype.__new__;
        const self = factory !== undefined
                        ? factory.call(this, ...args)
                        // @ts-ignore
                        : new this(...args);
        // @ts-ignore
        const init = this.prototype.__init__;
        if( init !== undefined)
            init.call(self, ...args);
        
        return self
    }
    __eq__(b: unknown) {
        return lit(this == b);
    }
}