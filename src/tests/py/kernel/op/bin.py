class Empty:
    pass

class Op:
    def __add__(self, o: object):
        return "__add__"
    def __sub__(self, o: object):
        return "__sub__"
    def __mul__(self, o: object):
        return "__mul__"
    def __truediv__(self, o: object):
        return "__truediv__"
    def __floordiv__(self, o: object):
        return "__floordiv__"
    def __mod__(self, o: object):
        return "__mod__"
    def __pow__(self, o: object):
        return "__pow__"

    def __radd__(self, o: object):
        return "__radd__"
    def __rsub__(self, o: object):
        return "__rsub__"
    def __rmul__(self, o: object):
        return "__rmul__"
    def __rtruediv__(self, o: object):
        return "__rtruediv__"
    def __rfloordiv__(self, o: object):
        return "__rfloordiv__"
    def __rmod__(self, o: object):
        return "__rmod__"
    def __rpow__(self, o: object):
        return "__rpow__"
    
    def __and__(self, o: object):
        return "__and__"
    def __or__(self, o: object):
        return "__or__"
    def __xor__(self, o: object):
        return "__xor__"
    def __lshift__(self, o: object):
        return "__lshift__"
    def __rshift__(self, o: object):
        return "__rshift__"
    
    def __rand__(self, o: object):
        return "__rand__"
    def __ror__(self, o: object):
        return "__ror__"
    def __rxor__(self, o: object):
        return "__rxor__"
    def __rlshift__(self, o: object):
        return "__rlshift__"
    def __rrshift__(self, o: object):
        return "__rrshift__"

op = Op()
em = Empty()

assert op +  em is "__add__"
assert op -  em is "__sub__"
assert op *  em is "__mul__"
assert op /  em is "__truediv__"
assert op // em is "__floordiv__"
assert op %  em is "__mod__"
assert op ** em is "__pow__"

assert em +  op is "__radd__"
assert em -  op is "__rsub__"
assert em *  op is "__rmul__"
assert em /  op is "__rtruediv__"
assert em // op is "__rfloordiv__"
assert em %  op is "__rmod__"
assert em ** op is "__rpow__"

assert op &  em is "__and__"
assert op |  em is "__or__"
assert op ^  em is "__xor__"
assert op >> em is "__rshift__"
assert op << em is "__lshift__"

assert em &  op is "__rand__"
assert em |  op is "__ror__"
assert em ^  op is "__rxor__"
assert em >> op is "__rrshift__"
assert em << op is "__rlshift__"