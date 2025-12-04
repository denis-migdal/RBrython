def range(*args):
    beg = 0
    end = args[0];
    inc = 1

    # len() not impl yet
    len = __JS_AS_BIGINT__(__JS_WRITE__("args.length"))

    if len >= 2:
        beg = args[0]
        end = args[1]

        if len == 3:
            inc = args[2]

    i = beg
    while i != end:
        yield i
        i += inc