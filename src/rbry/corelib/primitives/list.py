from RBM import __JS_OP__, __JS_SHADOW__, __JS_WRITE__, Array

@__JS_SHADOW__("Array")
class list(Array):
    def __getitem__(self, i: int):
        return __JS_OP__(self, "[]", i)
    
    def __len__(self):
        return __JS_WRITE__("this.length")