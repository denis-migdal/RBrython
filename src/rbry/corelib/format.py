def format(o: object, f: str):
    return type(o).__format__(o, f)