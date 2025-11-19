def test(o: object, /):
    match o:
        case bool (): return "bool"
        case int  (): return "int"
        case float(): return "float"
        case _      : return "unknown"

assert test(1)    == "int"
assert test(1.)   == "float"
assert test(True) == "bool"