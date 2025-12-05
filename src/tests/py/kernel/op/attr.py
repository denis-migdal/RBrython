item = True

class X:
    def __getattr__(self, i: str):
        return item
    def __setattr__(self, i: str, v: object):
        global item
        item = v
    def __delattr__(self, i: str):
        global item
        item = None

x = X()

assert x.a is True

x.a = False
assert x.a is False

del x.a
assert x.a is None