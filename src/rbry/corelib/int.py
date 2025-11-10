from functools import singledispatchmethod
from types     import NotImplementedType

class int:

    def __new__(cls, o: object, /) -> int:
        return type(o).__int__(o) # type: ignore

    @singledispatchmethod
    def __add__(self, _: object, /) -> int|float|NotImplementedType:
        return NotImplemented
    
    @__add__.register
    def _(self, b: int, /) -> int:
        return __JS_ADD__(__JS_GET_HVALUE__(self), # type: ignore
                          __JS_GET_HVALUE__(b))    # type: ignore
    
    #@__add__.register
    #def _(self, b: float, /) -> float:
    #    return __JS_ADD__(__JS_GET_HVALUE__(self), b) # type: ignore