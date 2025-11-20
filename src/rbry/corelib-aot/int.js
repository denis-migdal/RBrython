;
;
var int = (() =>{
        function int() {
            return Object.create(int.prototype);
        }
    int.prototype.__new__ = function __new__(o, base, ){const cls = this;
        if( $RB.op($RB.call(type, o, ), "eq", str) ) {
        return (

                    (x, base) => {

                        if( base !== 16)

                            return BigInt(x);

                        

                        let result = 0n;

                        for(let i = 2; i < x.length; ++i)

                            result = result << 4n + BigInt( parseInt(this.slice(i, i+8), 16) );

                        return result;

                    }

                )(o,base);

    };
return $RB.mcall($RB.call(type, o, ), "__int__", o,  );

    };
int.prototype.__eq__ = function __eq__(o, ){const self = this;
        return self == o;

    };
int.prototype.__add__ = function __add__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self + o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__radd__ = function __radd__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return o + self;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__sub__ = function __sub__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self - o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rsub__ = function __rsub__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return o - self;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__mul__ = function __mul__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self * o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rmul__ = function __rmul__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return o * self;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__pow__ = function __pow__(o, mod, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self ** o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rpow__ = function __rpow__(o, mod, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return o ** self;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__div__ = function __div__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return $RB.call(__JS_AS_NUMBER__, self, ) / $RB.call(__JS_AS_NUMBER__, o, );

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rdiv__ = function __rdiv__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return $RB.call(__JS_AS_NUMBER__, o, ) * $RB.call(__JS_AS_NUMBER__, self, );

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__mod__ = function __mod__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self % o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rmod__ = function __rmod__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self % o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__or__ = function __or__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self | o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__ror__ = function __ror__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self | o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__and__ = function __and__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self & o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rand__ = function __rand__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self & o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__xor__ = function __xor__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self ^ o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rxor__ = function __rxor__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self ^ o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__lshift__ = function __lshift__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self << o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rlshift__ = function __rlshift__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self << o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rshift__ = function __rshift__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self >> o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__rrshift__ = function __rrshift__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self >> o;

        }else {
            return NotImplemented;

    }};

    };
int.prototype.__invert__ = function __invert__(){const self = this;
        return ~self;

    };
int.prototype.__neg__ = function __neg__(){const self = this;
        return -self;

    };
int.prototype.__abs__ = function __abs__(){const self = this;
        return (x => x < 0n ? -x : x)(self);

    };

        return int;
    })();
    ;

const __exported__ = {int}