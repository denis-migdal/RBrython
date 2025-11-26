class T:
    def __bool__(self):
        return True

class F:
    def __bool__(self):
        return False
    
t1 = T()
t2 = T()
f1 = F()
f2 = F()

assert (t1 or t2) is t1
assert (f1 or t1) is t1
assert (t1 or f1) is t1
assert (f1 or f2) is f2