def gen():
    yield 1
    yield 2
    yield 3

it = gen()

assert next(it) is 1
assert next(it) is 2
assert next(it) is 3
assert next(it, None) is None

def gen2():
    yield from gen()

it = gen2()

assert next(it) is 1
assert next(it) is 2
assert next(it) is 3
assert next(it, None) is None