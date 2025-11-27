class T:
    def __bool__(self):
        return True

class F:
    def __bool__(self):
        return False
    
def never():
    assert False

t1 = T()
t2 = T()
f1 = F()
f2 = F()
