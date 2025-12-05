class X:
    def __contains__(self, o: object):
        return o is 1

x = X()
assert 1 in x
assert 2 not in x

class Y:
    def __iter__(self):
        yield 1

y = Y()
assert 1 in y # pyright: ignore[reportOperatorIssue]
assert 2 not in y # pyright: ignore[reportOperatorIssue]