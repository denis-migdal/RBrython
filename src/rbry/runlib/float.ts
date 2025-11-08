// @ts-nocheck

import { getClass } from ".";

export class float {
    __eq__(b: unknown) {
        console.warn("=", this, b)
        return this == b
    }
    __add__(b: unknown) {
        return this + Number(b);
    }
    __radd__(b: unknown) {
        return Number(b) + this;
    }
    __mul__(b: unknown) {
        return this * Number(b);
    }
    __rmul__(b: unknown) {
        return Number(b) * this;
    }
    __div__(b: unknown) {
        return this/Number(b);
    }
    __sub__(b: unknown) {
        return this - Number(b);
    }
    __rsub__(b: unknown) {
        return Number(b) - this;
    }
    // unary
    static __call__(a: unknown) {
        const ka = getClass(a);
        return ka.prototype[`__float__`].call(a);
    }
    __neg__() {
        return -this;
    }
    __abs__() {
        return Math.abs(this);
    }
    __int__() {
        return Math.trunc(this);
    }
    // conversions
}