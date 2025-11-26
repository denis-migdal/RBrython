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

assert (t1 and t2) is t2
assert (f1 and t1) is f1
assert (t1 and f1) is f1
assert (f1 and f2) is f1