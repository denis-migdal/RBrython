from RBM import __JS_OP__, boolean

class bool(boolean): # type: ignore (bool is Final)
    def __new__(cls, arg: object, /) -> boolean:# -> Any | bool:
        # can't use "or", else we'll have infinite loop.
        if __JS_OP__(arg is True, "||", arg is False):
           return arg
        return type(arg).__bool__(arg) # type: ignore
    def __eq__(self, o: object, /) -> boolean:
        return __JS_OP__(self, "==", o)