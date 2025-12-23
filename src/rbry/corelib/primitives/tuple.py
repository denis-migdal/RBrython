from RBM import __JS_OP__, __JS_SHADOW__, __JS_WRITE__, ROArray

@__JS_SHADOW__("Array", True)
class tuple(ROArray):
    def __getitem__(self, i: int):
        return __JS_OP__(self, "[]", i)