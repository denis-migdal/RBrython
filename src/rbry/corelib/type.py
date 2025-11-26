from RBM import __JS_OP__, __JS_WRITE__

class type:
    def __new__(cls, o: object, /) -> type:
        return __JS_WRITE__("$RB.getClass(o)") # pyright: ignore[reportReturnType]

    def __call__(self, *args):
        __JS_WRITE__("""
                     let instance;
                     const factory = this.prototype.__new__;
                     if( factory !== undefined )
                        instance = factory.call(self, ...args)
                     else
                        instance = new self(...args) // JS
                     
                     const init = this.prototype.__init__;
                     if( init !== undefined)
                        init.call(self, ...args)
                     """)
        return instance # type: ignore

    def __eq__(self, b: object, /):
        return __JS_OP__(self, "===", b)