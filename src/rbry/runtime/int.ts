// @ts-nocheck

import { getClass } from ".";
import { NotImplemented } from "./NotImplemented";

export class int {
    __eq__(b: unknown) {
        return this == b;
    }
    __add__(b: unknown) {
        if( getClass(b) !== int)
            return NotImplemented;
        return this + b;
    }
    __mul__(b: unknown) {
        if( getClass(b) !== int)
            return NotImplemented;
        return this * b;
    }
    __pow__(b: unknown) {
        return this ** b;
    }
    __div__(b: unknown) {
        return Number(this)/Number(b);
    }
    __mod__(b: unknown) {
        return this % b; // TODO: python way...
    }
    __sub__(b: unknown) {
        if( getClass(b) !== int)
            return NotImplemented;
        return this - b;
    }
    // bit
    __or__(b: unknown) {
        return this | b;
    }
    __and__(b:unknown) {
        return this & b
    }
    __lshift__(b:unknown) {
        return this << b
    }
    __rshift__(b:unknown) {
        return this >> b
    }
    // unary
    static __call__( a: unknown, b?: int ) {
        const ka = getClass(a);
        return ka.prototype[`__int__`].call(a, b);
    }
    __invert__() {
        return ~ this;
    }
    __neg__() {
        return -this;
    }
    __abs__() {
        return this < 0n ? - this : this;
    }
}