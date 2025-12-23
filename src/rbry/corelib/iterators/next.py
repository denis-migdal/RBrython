from RBM import __JS_WRITE__

_marker = __JS_WRITE__("Symbol()") #object()

def next(it, defaultVal: object = _marker):
    val = __JS_WRITE__("it.next()") #TODO: we use JS iterator
    if __JS_WRITE__("val.done") == True:
        if defaultVal is _marker:
            raise Exception("StopIteration")
        return defaultVal
    
    return __JS_WRITE__("val.value")