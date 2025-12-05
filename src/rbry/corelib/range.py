def range(a1: int, a2: int|None = None, a3: int|None = None):
    beg = 0
    end = a1
    inc = 1

    if a2 is not None:
        beg = a1
        end = a2

        if a3 is not None:
            inc = a3

    i = beg
    while i != end:
        yield i
        i += inc