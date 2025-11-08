// @ts-nocheck

export class str {
    __eq__(b: unknown) {
        return this == b;
    }
    // conversions
    __float__() {
        if( this === "inf" || this === "infinity")
            return Number.POSITIVE_INFINITY;
        if( this === "-inf" || this === "-infinity")
            return Number.NEGATIVE_INFINITY;
        return Number(this);
    }
    __int__(base?: bigint) {
        if( base === undefined)
            return BigInt(this);

        if( base === 16n) {
            let result: bigint = 0n;

            for(let i = 2; i < this.length; ++i) {

                result = result << 4n + BigInt( parseInt(this.slice(i, i+8), 16) );
            }

            return result;
        }

        throw new Error("?");
    }
    //
    static __call__(a: unknown) {
        return `${a}`; // for now... (TODO: __str__ / toString() / ...)
    }
}