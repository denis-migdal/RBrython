from types import NotImplementedType
from RBM import __JS_OP__, __JS_SHADOW__, string

@__JS_SHADOW__("string")
class str(string):
    def __new__(cls, o: object, /) -> str:
        #return __JS_AS_STRING__(o) # type: ignore
        return type(o).__str__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o)
    
    def __add__(self, o: object, /) -> NotImplementedType|str:
        match o:
            case str  (): return __JS_OP__(self, "+", o) # type: ignore
            case _      : return NotImplemented

    def __mul__(self, o: object, /) -> NotImplementedType|str:
        match o:
            case int  (): return __JS_WRITE__("self.repeat(Number(b))") # type: ignore
            case _      : return NotImplemented
    
    def __rmul__(self, o: object, /) -> NotImplementedType|str:
        match o:
            case int  (): return __JS_WRITE__("self.repeat(Number(b))") # type: ignore
            case _      : return NotImplemented