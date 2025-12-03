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

op += em
assert op is "__add__"
op = Op()

op -=  em
assert op is "__sub__"
op = Op()

op *=  em
assert op is "__mul__"
op = Op()

op /=  em
assert op is "__truediv__"
op = Op()

op //= em
assert op is "__floordiv__"
op = Op()

op %=  em
assert op is "__mod__"
op = Op()

op **= em
assert op is "__pow__"
op = Op()

op &=  em
assert op is "__and__"
op = Op()

op |=  em
assert op is "__or__"
op = Op()

op ^= em
assert op is "__xor__"
op = Op()

op >>= em 
assert op is "__rshift__"
op = Op()

op <<= em
assert op is "__lshift__"
op = Op()

# reversed
em += op
assert em is "__radd__"
em = Empty()

em -=  op
assert em is "__rsub__"
em = Empty()

em *=  op
assert em is "__rmul__"
em = Empty()

em /=  op
assert em is "__rtruediv__"
em = Empty()

em //= op
assert em is "__rfloordiv__"
em = Empty()

em %=  op
assert em is "__rmod__"
em = Empty()

em **= op
assert em is "__rpow__"
em = Empty()

em &=  op
assert em is "__rand__"
em = Empty()

em |=  op
assert em is "__ror__"
em = Empty()

em ^= op
assert em is "__rxor__"
em = Empty()

em >>= op 
assert em is "__rrshift__"
em = Empty()

em <<= op
assert em is "__rlshift__"
em = Empty()