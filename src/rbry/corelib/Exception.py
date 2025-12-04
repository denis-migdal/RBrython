
from RBM import __JS_WRITE__

class Exception():

    def __new__(cls, arg: str|None):
        return __JS_WRITE__("new Error(arg)")

    def __str__(self):
        return __JS_WRITE__("this.message")