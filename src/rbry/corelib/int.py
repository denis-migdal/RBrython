from functools import singledispatchmethod
from types     import NotImplementedType

class int:
    #def __new__(cls) :
    #    return 2

    @singledispatchmethod
    def __add__(self, b: object) -> int|NotImplementedType:
        return NotImplemented
    
    # static {
    #     this.prototype.__add__["int"] = function() {}
    # }
    @__add__.register
    def _(self, b: int) -> int:
        return __JS_ADD__(self, b) # type: ignore