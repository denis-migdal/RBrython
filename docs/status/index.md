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


### Operators (11/12)

<table>
    <tbody>
        <tr>
            <td>$\color{green}{-, +, \textasciitilde}$</td>
            <td>$\color{green}{+, -, *, /, \text{//}, \%, \text{**}}$</td>
            <td>$\color{green}{\&, |, \textasciicircum, <<, >>}$</td>
            <td>$\color{green}{>, <, ==, \text{!=}, <=, >=}$</td>
        </tr>
        <tr>
            <td>$\color{green}{Rich~assignments}$<sup>10</sup></td>
            <td>$\color{green}{=, :=}$<sup>6,10</sup></td>
            <td>$\color{green}{[]/./del}$<sup>9,11,12,13</sup></td>
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

- <sup>6</sup> : walrus op, need to pre-declare variable if not declared.
- <sup>9</sup> : slice not implemented.
- <sup>10</sup> : many subscript/attr as target not implemented.
- <sup>11</sup> : properties descriptor not implemented.
- <sup>12</sup> : __getattribute__ not implemented.
- <sup>13</sup> : fallbacks not implemented.

### Classes

- methods
- attributes
- decorators
- etc.

## Core

### Object (1/10)

<table>
    <tbody>
        <tr>
            <td>${\color{green}{eq/ne/lt/gt/le/ge}}$</td>
            <td>${\color{red}{getattribute/setattr/delattr}}$</td>
        </tr>
        <tr>
            <td>${\color{red}{format/repr/str}}$</td>
            <td>${\color{red}{dir/doc}}$</td>
        </tr>
        <tr>
            <td>${\color{red}{new/init/class}}$</td>
            <td>${\color{red}{class/mro}}$</td>
        </tr>
        <tr>
            <td>${\color{red}{init_subclass/hash}}$</td>
            <td>${\color{red}{reduce/reduce_ex/getstate}}$</td>
        </tr>
        <tr>
            <td>${\color{red}{subclasshook}}$</td>
            <td>${\color{red}{sizeof}}$</td>
        </tr>
    </tbody>
</table>

### Type

(some are inherited from object)

- attr defined in type
    - __abstractmethods__
    - __annotations__
    - __basicsize__
    - __dict__
    - __dictoffset__
    - __doc__
    - __flags__
    - __itemsize__
    - __module__
    - __mro__
    - __name__
    - __qualname__
    - __text_signature__
    - __type_params__
    - __weakrefoffset__
- method in type
    - __base__
    - __call__
    - __class__


- Object prop. likely from type.
    - __call__
    - __instancecheck__ : isinstance()
    - __subclasscheck__ : issubclass()
    - __prepare__ (?)
    - __or__ /__ror__
    - __bases__
    - + static attributes.

- overriden
    - __new__
    - __init__
    - __getattribute__
    - __delattr__
    - __dir__
    - __init_subclass__
    - __instancecheck__
    - __or__
    - __ror__
    - __prepare__
    - __repr__
    - __setattr__
    - __sizeof__
    - __subclasscheck__
    - __subclasses__
    - __subclasshook__
    - mro


### Others

- bool inherit int
- f-string: done.
