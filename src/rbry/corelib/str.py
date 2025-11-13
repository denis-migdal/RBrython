class str:
    def __new__(cls, o: object, /) -> str:
        return __JS_AS_STRING__(o) # type: ignore
        #return type(o).__str__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o) # type: ignore