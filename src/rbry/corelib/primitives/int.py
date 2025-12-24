from types import NotImplementedType
from RBM import __JS_AS_NUMBER__, __JS_OP__, __JS_SHADOW__, bigint

@__JS_SHADOW__("bigint")
class int(bigint):

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
    
    def __str__(self):
        return __JS_WRITE__("`${this}`")
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o)
    
    def __ge__(self, o: object, /) -> bool:
        return __JS_OP__(self, ">=", o)


    def __add__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "+", o)
            case _      : return NotImplemented
    
    def __radd__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(o, "+", self)
            case _      : return NotImplemented
    

    def __sub__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "-", o)
            case _      : return NotImplemented
    
    def __rsub__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(o, "-", self)
            case _      : return NotImplemented
    
    def __mul__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "*", o)
            case _      : return NotImplemented
    
    def __rmul__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(o, "*", self)
            case _      : return NotImplemented

    def __pow__(self, o: object, mod: int|None = None, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "**", o)
            case _      : return NotImplemented
    
    def __rpow__(self, o: object, mod: int|None = None, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(o, "**", self)
            case _      : return NotImplemented

    def __truediv__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case int  (): return __JS_OP__(__JS_AS_NUMBER__(self),
                                           "/",
                                           __JS_AS_NUMBER__(o))
            case _      : return NotImplemented
    
    def __rtruediv__(self, o: object, /) -> NotImplementedType|float:
        match o:
            case int  (): return __JS_OP__(__JS_AS_NUMBER__(o),
                                           "*",
                                           __JS_AS_NUMBER__(self) )
            case _      : return NotImplemented

    def __mod__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "%", o)
            case _      : return NotImplemented
    
    def __rmod__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "%", o)
            case _      : return NotImplemented
    
    def __or__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "|", o)
            case _      : return NotImplemented
    
    def __ror__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "|", o)
            case _      : return NotImplemented

    def __and__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "&", o)
            case _      : return NotImplemented
    
    def __rand__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "&", o)
            case _      : return NotImplemented
        
    def __xor__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "^", o)
            case _      : return NotImplemented
    
    def __rxor__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "^", o)
            case _      : return NotImplemented

    def __lshift__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  ():
                __JS_LOG__("INT")
                return __JS_OP__(self, "<<", o)
            case _      :
                __JS_LOG__("OTHER", o)
                return NotImplemented
    
    def __rlshift__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, "<<", o)
            case _      : return NotImplemented

    def __rshift__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, ">>", o)
            case _      : return NotImplemented
    
    def __rrshift__(self, o: object, /) -> NotImplementedType|int:
        match o:
            case int  (): return __JS_OP__(self, ">>", o)
            case _      : return NotImplemented
    
    ### unary operators ###
    def __invert__(self, /) -> int:
        return __JS_OP__("~", self)

    def __neg__(self, /) -> int:
        return __JS_OP__("-", self)
    
    def __abs__(self, /) -> int:
         return __JS_RUN__("x => x < 0n ? -x : x", self) # type: ignore