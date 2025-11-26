from RBM import __JS_OP__, boolean

class bool(boolean): # type: ignore (bool is Final)
    def __new__(cls, arg: object, /):
        return type(arg).__bool__(arg) # type: ignore
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o)