class Op:
    def __pos__(self):
        return "__pos__"
    def __neg__(self):
        return "__neg__"
    def __invert__(self):
        return "__invert__"
    
op = Op()

assert +op is "__pos__"
assert -op is "__neg__"
assert ~op is "__invert__"