from RBM import __JS_WRITE__, obj

class object(obj): # typecheck h4ck

    def __new__(cls):
        return __JS_WRITE__("Object.create(this.prototype)")

    def __eq__(self, o: obj, /):
        if self is o: return True
        return NotImplemented
    
    def __ne__(self, o: obj, /):
        return not self == o
    
    def __lt__(self, o: obj, /):
        return NotImplemented
    def __le__(self, o: obj, /):
        return NotImplemented
    def __gt__(self, o: obj, /):
        return NotImplemented
    def __ge__(self, o: obj, /):
        return NotImplemented
    
    def __getattribute__(self, attr: string, /):
        return __JS_OP__(self, "[]", attr) #TODO: better
    
    # print
    def __repr__(self):
        cls = type(self)
        return "<"+ cls.__module__ + "." + cls.__qualname__ + " object>"
        # using f"" = infinite loop.
    
    def __str__(self):
        return type(self).__repr__(self)
    
    def __format__(self, f:str):
        return type(self).__str__(self)