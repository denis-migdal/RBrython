## Kernel

### Keywords (11/12)

https://www.w3schools.com/python/python_ref_keywords.asp

<table>
    <tbody>
        <tr>
            <td>$\color{green}{if/elif/else/assert}$<sup>1</sup></td>
            <td>$\color{green}{for/while/continue/break}$<sup>3</sup></td>
            <td>$\color{orange}{match/case}$</td>
        </tr>
        <tr>
            <td>$\color{green}{and/or/not}$</td>
            <td>$\color{green}{is/is~not}$</td>
            <td>$\color{green}{in/not~in}$</td>
        </tr>
        <tr>
            <td>$\color{green}{def/lambda/return/pass}$</td>
            <td>$\color{green}{raise/try/except/finally/with}$<sup>1,3,7,8</sup></td>
            <td>$\color{green}{async/await}$<sup>5</sup></td>
        </tr>
        <tr>
            <td>$\color{green}{import/from/as}$<sup>4</sup></td>
            <td>$\color{green}{global/nonlocal}$<sup>2</sup></td>
            <td>$\color{green}{yield/yield from}$</td>
        </tr>
    </tbody>
</table>

- <sup>1</sup> stacktrace not implemented (with source map).
- <sup>2</sup> global shadowed by a non local not implemented.
- <sup>3</sup> else not implemented
- <sup>4</sup> resolver non implemented
- <sup>5</sup> upon call should not run immediately.
- <sup>7</sup> finalbody need to be checked (for yield and typecheck)
- <sup>8</sup> with __exit__ not properly implemented when exception.


### Operators (10/12)

<table>
    <tbody>
        <tr>
            <td>$\color{green}{-, +, \textasciitilde}$</td>
            <td>$\color{green}{+, -, *, /, \text{//}, \%, \text{**}}$</td>
            <td>$\color{green}{\&, |, \textasciicircum, <<, >>}$</td>
            <td>$\color{green}{>, <, ==, \text{!=}, <=, >=}$</td>
        </tr>
        <tr>
            <td>$\color{green}{Rich~assignments}$</td>
            <td>$\color{green}{=, :=}$<sup>6</sup></td>
            <td>$\color{green}{[]}/\color{orange}{./del}$</td>
            <td>$\color{green}{in/not~in}$</td>
        </tr>
        <tr>
            <td>$\color{green}{and/or/not}$</td>
            <td>$\color{green}{is/is~not}$</td>
            <td>$\color{green}{ternary~op}$</td>
            <td>$\color{red}{list~comprehension}$</td>
        </tr>
    </tbody>
</table>

- f-string: done too.

- <sup>6</sup> : walrus op, need to pre-declare variable if not declared.

### Classes

- methods
- attributes
- decorators
- etc.

## Core

- object as py object + inheritance