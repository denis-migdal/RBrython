class F:
    def __bool__(self):
        return False
    
assert not F()
