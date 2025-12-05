from RBM import obj

class object(obj): # typecheck h4ck
    def __eq__(self, o: obj, /):
        if self is o: return True
        return NotImplemented
    
    def __ne__(self, o: obj, /):
        return not self == o
    
    def __lt__(self, o: obj, /):
        return NotImplemented
    def __le__(self, o: obj, /):
        return NotImplemented
    def __gt__(self, o: obj, /):
        return NotImplemented
    def __ge__(self, o: obj, /):
        return NotImplemented