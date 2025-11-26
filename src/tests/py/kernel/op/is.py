class X:
    pass

a = X()
b = X()

assert a is a
assert b is not a