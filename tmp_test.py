from functools import singledispatchmethod
from types     import NotImplementedType

class X:

    def __new__(cls, o: object, /) -> int:
        __JS_LOG__(cls, o) # type: ignore
        return type(o).__int__(o) # type: ignore

    @singledispatchmethod
    def __add__(self, _: object, /) -> int|float|NotImplementedType:
        return NotImplemented
    
    @__add__.register
    def _(self, b: int, /) -> int:
        return __JS_ADD__(self, b) # type: ignore
    
    @__add__.register
    def _(self, b: float, /) -> float:
        return __JS_ADD__(self, b) # type: ignore

x = X()
__JS_LOG__(x+1.) # type: ignore