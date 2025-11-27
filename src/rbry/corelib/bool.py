from RBM import __JS_OP__, __JS_WRITE__, boolean

class bool(boolean): # type: ignore (bool is Final)
    def __new__(cls, arg: object, /) -> boolean:# -> Any | bool:
        # can't use Python "if", "or" as we'd have an infinite loop.
        __JS_WRITE__("if(arg === true || arg === false) { return arg; }")
        return type(arg).__bool__(arg) # type: ignore
    def __eq__(self, o: object, /) -> boolean:
        return __JS_OP__(self, "==", o)