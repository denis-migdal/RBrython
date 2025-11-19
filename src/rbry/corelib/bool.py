from RBM import __JS_OP__, boolean

class bool(boolean): # type: ignore (bool is Final)
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o)