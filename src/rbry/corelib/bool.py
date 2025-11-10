from functools import singledispatchmethod
from types     import NotImplementedType

class bool:
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_FROM_OPI__(self, "==", o) # type: ignore
