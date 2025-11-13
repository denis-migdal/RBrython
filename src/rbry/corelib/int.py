from functools import singledispatchmethod
from types     import NotImplementedType

class int:

    def __new__(cls, o: object, base: int, /) -> int:
        if type(o) == str:
            return __JS_RUN__( # type: ignore
                '''
                    (x, base) => {
                        if( base !== 16)
                            return BigInt(x);
                        
                        let result = 0n;
                        for(let i = 2; i < x.length; ++i)
                            result = result << 4n + BigInt( parseInt(this.slice(i, i+8), 16) );
                        return result;
                    }
                ''', o, base) # type: ignore
        return type(o).__int__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o) # type: ignore

    ### add ###

    @singledispatchmethod
    def __add__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented
    
    @__add__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "+", b) # type: ignore
    
    ### add ###

    @singledispatchmethod
    def __sub__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented
    
    @__sub__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "-", b) # type: ignore
    
    ### mul ###
    @singledispatchmethod
    def __mul__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented
    
    @__mul__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "*", b) # type: ignore
    
    ### pow ###
    @singledispatchmethod
    def __pow__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented
    
    @__pow__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "**", b) # type: ignore
    
    ### div ###
    @singledispatchmethod
    def __div__(self, _: object, /) -> float|NotImplementedType:
        return NotImplemented
    
    @__div__.register
    def _(self, b: int, /) -> float:
        return __JS_OP__(__JS_AS_NUMBER__(self), # type: ignore
                         "/",
                         __JS_AS_NUMBER__(b)) # type: ignore
    
    ### mod ###
    @singledispatchmethod
    def __mod__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented

    @__mod__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "%", b) # type: ignore
    
    ### or ###
    @singledispatchmethod
    def __or__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented

    @__or__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "|", b) # type: ignore

    ### and ###
    @singledispatchmethod
    def __and__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented

    @__and__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "&", b) # type: ignore
    
    
    ### lshift ###
    @singledispatchmethod
    def __lshift__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented

    @__lshift__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, "<<", b) # type: ignore
    
    ### rshift ###
    @singledispatchmethod
    def __rshift__(self, _: object, /) -> int|NotImplementedType:
        return NotImplemented

    @__rshift__.register
    def _(self, b: int, /) -> int:
        return __JS_OP__(self, ">>", b) # type: ignore

    ### unary operators ###
    def __invert__(self, /) -> int:
        return __JS_OP__("~", self) # type: ignore

    def __neg__(self, /) -> int:
        return __JS_OP__("-", self) # type: ignore
    
    def __abs__(self, /) -> int:
         return __JS_RUN__("x => x < 0n ? -x : x", self) # type: ignore