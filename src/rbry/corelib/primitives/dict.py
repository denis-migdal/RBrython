from JS import Symbol

__BUCKETS__ = Symbol("buckets")

class dict:
    def __init__(self, args):

        __JS_WRITE__("this[__BUCKETS__] = new Map()")

        # destructured arg not implemented in for
        # __eq__ influence not implemented...
        for i in range(len(args)):
            __JS_WRITE__("this[__BUCKETS__]").set(args[i][0], args[i][1])