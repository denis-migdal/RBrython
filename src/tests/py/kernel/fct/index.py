def foo(a, *b, c, **d):
    assert a is 0
    assert b[0] is 1
    assert c is 2
    assert d.d is 3

foo(0, 1, c=2, d=3)

def f1(a: int = 1, /):
    return a
assert f1() is 1

def f2(a: int = 2):
    return a
assert f2() is 2

def f3(*, a: int = 3):
    return a
assert f3() is 3