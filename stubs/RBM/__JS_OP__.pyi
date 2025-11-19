from typing import Literal, overload

from RBM import bigint, boolean, number

# binary
@overload
def __JS_OP__(a: object, op: Literal["=="], b: object) -> boolean: ...

@overload
def __JS_OP__(a: bigint,
             op: Literal["+"]|Literal["-"]|Literal["/"]|Literal["*"]
                |Literal["%"]|Literal["**"],
              b: bigint) -> bigint: ...
@overload
def __JS_OP__(a: number,
             op: Literal["+"]|Literal["-"]|Literal["/"]|Literal["*"]
                |Literal["%"]|Literal["**"],
              b: number) -> number: ...


@overload
def __JS_OP__(a: bigint,
             op: Literal["|"]|Literal["&"]|Literal["^"]|Literal[">>"]
             |Literal["<<"],
              b: bigint) -> bigint: ...

@overload
def __JS_OP__(a: object, op: str, b: object) -> object: ...

# unary
@overload
def __JS_OP__(op: Literal["-"], a: bigint) -> bigint: ...
@overload
def __JS_OP__(op: Literal["-"], a: number) -> number: ...

@overload
def __JS_OP__(op: Literal["~"], a: bigint) -> bigint: ...

@overload
def __JS_OP__(op: str, a: object) -> object: ...

def __JS_OP__(*args: object) -> object:
    pass