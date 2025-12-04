def isinstance(o: object, t):
    ot = type(o)
    # TODO: better
    return ot is t