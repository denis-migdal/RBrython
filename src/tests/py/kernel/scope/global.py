x = 0

def foo():
    x = 1 # type: ignore

y = 0
def faa():
    global y
    y = 1

foo()
faa()

assert x is 0
assert y is 1