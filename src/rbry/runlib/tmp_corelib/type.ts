export class type {
    __call__(...args: any[]) {
        // @ts-ignore
        return this.prototype.__new__.call(this, ...args);
    }
    __eq__(b: unknown) {
        return this == b;
    }
}