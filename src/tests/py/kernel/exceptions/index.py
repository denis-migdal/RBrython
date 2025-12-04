ok = False

try:
    raise Exception()
except:
    ok = True
assert ok
ok = False

try:
    raise Exception()
except:
    pass
finally:
    ok = True
assert ok
ok = False

try:
    raise Exception()
except Exception:
    ok = True
assert ok
ok = False

try:
    raise Exception("ok")
except Exception as e:
    ok = True
    #assert str(e) == "ok"
assert ok
ok = False