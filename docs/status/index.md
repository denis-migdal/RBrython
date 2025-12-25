## Kernel

- green: done and tested.
- yellow
- orange: partially done or not tested.
- red: todo
- gray: don't care for now

###  Brython unit tests (120/6150)

Target: 200 lines/week (started the 2025/12/25).<br/>
For now the goal is to rewrite the unit test, not to pass the originals (that might require unimplemented features).

Cf https://github.com/brython-dev/brython/tree/master/www/tests<br/>
Original tests stored in /src/assets/unittests, tests are rewritten in /src/tests/py, test to be rewritten are stored in /src/test/brython.

- <b>classes:</b> classes (1176), descriptor (27), decorators (99), $\color{yellow}{test~rmethod (120)}$, special methods (108)
- <b>functions:</b> packed_argument (12)
- <b>imports:</b> imports (112), test_from_import (26), global_in_imported.py (19)
- <b>test_types</b> (129)
- <b>f-string</b> (138)
- <b>iterators:</b> iterators (94), generator (1262)
- <b>exceptions:</b> exceptions (210), exceptions_trace (257)
- <b>misc:</b> simple (15) (no asserts...), basic test suite (1132), test_suite (1214)

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
            <td>$\color{green}{[]/./del}$<sup>9,11,13</sup></td>
            <td>$\color{green}{in/not~in}$</td>
        </tr>
        <tr>
            <td>$\color{green}{and/or/not}$</td>
            <td>$\color{green}{is/is~not}$</td>
            <td>$\color{green}{ternary~op}$</td>
            <td>$\color{orange}{comprehension}/\color{red}{unpack}$<sup>14</sup></td>
        </tr>
    </tbody>
</table>

- <sup>6</sup> : walrus op, need to pre-declare variable if not declared.
- <sup>9</sup> : slice not implemented.
- <sup>10</sup> : many subscript/attr as target not implemented.
- <sup>11</sup> : properties descriptor not implemented.
- <sup>13</sup> : fallbacks not implemented.
- <sup>14</sup> : not tested, set comp not implemented.

### Classes

- methods
- attributes
- decorators
- etc.

## Core

### Builtins (0/71)

https://docs.python.org/3/library/functions.html

- <b>Primitives:</b> $\color{orange}{object}$ / $\color{orange}{type}$ / $\color{orange}{str}$ / $\color{orange}{float}$ / $\color{orange}{int}$ / $\color{orange}{bool}$ / $\color{gray}{complex}$ / $\color{orange}{list}$ / $\color{orange}{tuple}$ / $\color{red}{slice}$ / $\color{gray}{bytearray}$ / $\color{gray}{bytes}$ / $\color{gray}{memoryview}$ / $\color{gray}{set}$ / $\color{gray}{frozenset}$ / $\color{orange}{dict}$
- <b>Print:</b> $\color{orange}{print}$ / $\color{orange}{format}$ / $\color{orange}{repr}$ / $\color{gray}{dir}$ / $\color{gray}{id}$ / $\color{gray}{chr}$ / $\color{gray}{ord}$ / $\color{gray}{ascii}$ / $\color{gray}{bin}$ / $\color{gray}{hex}$ / $\color{gray}{oct}$
- <b>Operators:</b> $\color{gray}{help}$ / $\color{orange}{len}$ / $\color{gray}{divmod}$ / $\color{gray}{pow}$ / $\color{orange}{abs}$ / $\color{gray}{round}$ /  $\color{gray}{hash}$
- <b>Iterators:</b> $\color{orange}{range}$ / $\color{red}{iter}$ / $\color{red}{aiter}$ / $\color{orange}{next}$ / $\color{red}{anext}$ / $\color{gray}{reversed}$
- <b>Lists:</b> $\color{gray}{enumerate / sorted / sum / max / min / all / any / map / filter / zip}$
- <b>Class op.:</b> $\color{red}{classmethod / staticmethod / property / isinstance / issubclass / super}$
- <b>Attr:</b> $\color{red}{getattr / setattr / delattr / hasattr}$
- <b>Debug & system:</b> $\color{gray}{callable / breakpoint / compile / eval / exec / input / open / import / globals / vars / locals}$

### Object (1/10)

<table>
    <tbody>
        <tr>
            <td>${\color{green}{eq/ne/lt/gt/le/ge}}$</td>
            <td>${\color{red}{getattribute/setattr/delattr}}$</td>
        </tr>
        <tr>
            <td>${\color{orange}{format/repr/str}}$</td>
            <td>${\color{gray}{dir/doc}}$</td>
        </tr>
        <tr>
            <td>${\color{orange}{new/init}}$</td>
            <td>${\color{gray}{class/mro}}$</td>
        </tr>
        <tr>
            <td>${\color{gray}{init\_subclass/hash}}$</td>
            <td>${\color{gray}{reduce/reduce\_ex/getstate}}$</td>
        </tr>
        <tr>
            <td>${\color{gray}{subclasshook}}$</td>
            <td>${\color{gray}{sizeof}}$</td>
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

- f-string: done (format is itself an f-string).
- t-string: not implemented
