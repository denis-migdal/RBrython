exitCalled = False
class X:
    def __enter__(self):
        return True

    def __exit__(self, exc_type, exc_value, traceback):
        global exitCalled
        assert exc_type  is None
        assert exc_value is None
        assert traceback is None
        exitCalled = True
        return True

with X() as x:
    assert x is True

assert exitCalled is True


exitCalled = False
class Y:
    def __enter__(self):
        return True

    def __exit__(self, exc_type, exc_value, traceback):
        global exitCalled
        # TODO better check...
        assert exc_type  is not None
        assert exc_value is not None
        assert traceback is not None
        exitCalled = True
        return True

with Y() as y:
    raise Exception("test")

assert exitCalled is True