item = True

class X:
    def __getitem__(self, i: int):
        return item
    def __setitem__(self, i: int, v: object):
        global item
        item = v
    def __delitem__(self, i: int):
        global item
        item = None

x = X()

assert x[0] is True

x[0] = False
assert x[0] is False

del x[0]
assert x[0] is None