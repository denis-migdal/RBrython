from types import NotImplementedType
from RBM import __JS_OP__, __JS_AS_NUMBER__, __JS_WRITE__, number

class float(number):
    def __new__(cls, o: object, /) -> float:
        if type(o) is str:
            if o == "infinity" or o == "inf":
                return __JS_WRITE__("Number.POSITIVE_INFINITY") # pyright: ignore[reportReturnType]
            if o == "-infinity" or o == "-inf":
                return __JS_WRITE__("Number.NEGATIVE_INFINITY") # pyright: ignore[reportReturnType]
            return __JS_AS_NUMBER__(o)
        return type(o).__float__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o)    

    def __add__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(self, "+", o)
            case int  (): return __JS_OP__(self, "+", __JS_AS_NUMBER__(o))
            case _      : return NotImplemented

    def __radd__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(o                  , "+", self)
            case int  (): return __JS_OP__(__JS_AS_NUMBER__(o), "+", self)
            case _      : return NotImplemented

    def __sub__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(self, "-", o)
            case int  (): return __JS_OP__(self, "-", __JS_AS_NUMBER__(o))
            case _      : return NotImplemented

    def __rsub__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(o                  , "-", self)
            case int  (): return __JS_OP__(__JS_AS_NUMBER__(o), "-", self)
            case _      : return NotImplemented

    def __mul__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(self, "*", o)
            case int  (): return __JS_OP__(self, "*", __JS_AS_NUMBER__(o))
            case _      : return NotImplemented

    def __rmul__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(o                  , "*", self)
            case int  (): return __JS_OP__(__JS_AS_NUMBER__(o), "*", self)
            case _      : return NotImplemented

    def __div__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(self, "/", o)
            case int  (): return __JS_OP__(self, "/", __JS_AS_NUMBER__(o))
            case _      : return NotImplemented

    def __rdiv__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case float(): return __JS_OP__(o                  , "/", self)
            case int  (): return __JS_OP__(__JS_AS_NUMBER__(o), "/", self)
            case _      : return NotImplemented

    ### unary operators ###

    def __neg__(self, /) -> float:
        return __JS_OP__("-", self)
    
    def __int__(self, /) -> int:
        return __JS_RUN__('(x) => Math.trunc(x)', self) # type: ignore
    
    def __abs__(self, /) -> int:
         return __JS_RUN__('(x) => Math.abs(x)', self) # type: ignore