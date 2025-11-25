/**
 * OK
 */
type Foo = number

/**
 * HELL NO
 */
declare function foo(): void;

declare const BRY: {
    foo: typeof foo
}

/**
 * Hello
 */
export default BRY;