class Empty:
    pass

class Op:
    def __iadd__(self, o: object):
        return "__iadd__"
    def __isub__(self, o: object):
        return "__isub__"
    def __imul__(self, o: object):
        return "__imul__"
    def __itruediv__(self, o: object):
        return "__itruediv__"
    def __ifloordiv__(self, o: object):
        return "__ifloordiv__"
    def __imod__(self, o: object):
        return "__imod__"
    def __ipow__(self, o: object):
        return "__ipow__"
    
    def __iand__(self, o: object):
        return "__iand__"
    def __ior__(self, o: object):
        return "__ior__"
    def __ixor__(self, o: object):
        return "__ixor__"
    def __ilshift__(self, o: object):
        return "__ilshift__"
    def __irshift__(self, o: object):
        return "__irshift__"

op = Op()
em = Empty()

op += em
assert op is "__iadd__"
op = Op()

op -=  em
assert op is "__isub__"
op = Op()

op *=  em
assert op is "__imul__"
op = Op()

op /=  em
assert op is "__itruediv__"
op = Op()

op //= em
assert op is "__ifloordiv__"
op = Op()

op %=  em
assert op is "__imod__"
op = Op()

op **= em
assert op is "__ipow__"
op = Op()

op &=  em
assert op is "__iand__"
op = Op()

op |=  em
assert op is "__ior__"
op = Op()

op ^= em
assert op is "__ixor__"
op = Op()

op >>= em 
assert op is "__irshift__"
op = Op()

op <<= em
assert op is "__ilshift__"
op = Op()