class Empty:
    pass

class Op:

    def __eq__(self, o: object):
        return True
    def __ne__(self, o: object):
        return False
    
    def __lt__(self, o: object):
        return True
    def __gt__(self, o: object):
        return True
    
    def __le__(self, o: object):
        return True
    def __ge__(self, o: object):
        return True
    
e = Empty()
o = Op()

assert o == e
assert not (o != e)
assert o <  e
assert o >  e
assert o <= e
assert o >= e

canCall = True
def foo():
    global canCall 
    assert canCall
    canCall = False
    return o

assert not (o == foo() != o)

assert e == o
assert not (o != o)
assert e <  o
assert e >  o
assert e <= o
assert e >= o