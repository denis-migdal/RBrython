class bool:
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_OP__(self, "==", o) # type: ignore
