from functools import singledispatchmethod
from types     import NotImplementedType

class float:
    def __new__(cls, o: object, /) -> int:
        if type(o) is str:
            return __JS_AS_NUMBER__(o) # type: ignore
        return type(o).__float__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o) # type: ignore
    

    ### add ###
    @singledispatchmethod
    def __add__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__add__.register
    def _(self, b: float, /) -> float:
        return __JS_OP__(self, "+", b) # type: ignore
    
    @__add__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__(  self, "+", __JS_AS_NUMBER__(b)) # type: ignore

    @singledispatchmethod
    def __radd__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__radd__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__(  __JS_AS_NUMBER__(b), "+", self) # type: ignore
    

    ### sub ###
    @singledispatchmethod
    def __sub__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__sub__.register
    def _(self, b: float, /) -> float:
        return __JS_OP__(self, "-", b) # type: ignore
    
    @__sub__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__( self, "-", __JS_AS_NUMBER__(b)) # type: ignore

    @singledispatchmethod
    def __rsub__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__rsub__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__( __JS_AS_NUMBER__(b), "-", self) # type: ignore
    
    ### mul ###
    @singledispatchmethod
    def __mul__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__mul__.register
    def _(self, b: float, /) -> float:
        return __JS_OP__(self, "*", b) # type: ignore
    
    @__mul__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__( self, "*", __JS_AS_NUMBER__(b)) # type: ignore

    @singledispatchmethod
    def __rmul__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__rmul__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__( __JS_AS_NUMBER__(b), "*", self) # type: ignore

    ### div ###
    @singledispatchmethod
    def __div__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__div__.register
    def _(self, b: float, /) -> float:
        return __JS_OP__(self, "/", b) # type: ignore
    
    @__div__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__( self, "/", __JS_AS_NUMBER__(b)) # type: ignore

    @singledispatchmethod
    def __rdiv__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__rdiv__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__( __JS_AS_NUMBER__(b), "/", self) # type: ignore
    
    ### unary operators ###

    def __neg__(self, /) -> float:
        return __JS_OP__("-", self) # type: ignore
    
    def __int__(self, /) -> int:
        return __JS_RUN__('(x) => Math.trunc(x)', self) # type: ignore
    
    def __abs__(self, /) -> int:
         return __JS_RUN__('(x) => Math.abs(x)', self) # type: ignore