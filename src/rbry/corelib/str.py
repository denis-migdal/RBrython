from functools import singledispatchmethod
from types     import NotImplementedType

class str:
    def __new__(cls, o: object, /) -> str:
        return __JS_AS_STRING__(o) # type: ignore
        #return type(o).__str__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o) # type: ignore

    ### mul ###
    @singledispatchmethod
    def __mul__(self, _: object, /) -> str|NotImplementedType:
        return NotImplemented
    
    @__mul__.register
    def _(self, b: int, /) -> str:
        return __JS_WRITE__("self.repeat(Number(b))") # type: ignore
    
    @singledispatchmethod
    def __rmul__(self, _: object, /) -> str|NotImplementedType:
        return NotImplemented
    
    @__rmul__.register
    def _(self, b: int, /) -> str:
        return __JS_WRITE__("self.repeat(Number(b))") # type: ignore