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