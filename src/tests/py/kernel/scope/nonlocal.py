def foo():
    x = 1
    y = 1
    def faa():
        nonlocal x
        x = 2
        y = 2 # pyright: ignore[reportUnusedVariable]

    faa()

    assert x is 2
    assert y is 1

foo()