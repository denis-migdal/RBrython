;
;
var float = (() =>{
        function float() {
            return Object.create(float.prototype);
        }
    float.prototype.__new__ = function __new__(o, ){const cls = this;
        if( $RB.call(type, o, ) === str ) {
        if( $RB.op(o, "eq", "infinity")||$RB.op(o, "eq", "inf") ) {
        return Number.POSITIVE_INFINITY;

    };
if( $RB.op(o, "eq", "-infinity")||$RB.op(o, "eq", "-inf") ) {
        return Number.NEGATIVE_INFINITY;

    };
return Number(o);

    };
return $RB.mcall($RB.call(type, o, ), "__float__", o,  );

    };
float.prototype.__eq__ = function __eq__(o, ){const self = this;
        return self == o;

    };
float.prototype.__add__ = function __add__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return self + o;

        }else if( tname === "int") {
            return self + Number(o);

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__radd__ = function __radd__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return o + self;

        }else if( tname === "int") {
            return Number(o) + self;

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__sub__ = function __sub__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return self - o;

        }else if( tname === "int") {
            return self - Number(o);

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__rsub__ = function __rsub__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return o - self;

        }else if( tname === "int") {
            return Number(o) - self;

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__mul__ = function __mul__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return self * o;

        }else if( tname === "int") {
            return self * Number(o);

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__rmul__ = function __rmul__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return o * self;

        }else if( tname === "int") {
            return Number(o) * self;

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__div__ = function __div__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return self / o;

        }else if( tname === "int") {
            return self / Number(o);

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__rdiv__ = function __rdiv__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "float") {
            return o / self;

        }else if( tname === "int") {
            return Number(o) / self;

        }else {
            return NotImplemented;

    }};

    };
float.prototype.__neg__ = function __neg__(){const self = this;
        return -self;

    };
float.prototype.__int__ = function __int__(){const self = this;
        return ((x) => Math.trunc(x))(self);

    };
float.prototype.__abs__ = function __abs__(){const self = this;
        return ((x) => Math.abs(x))(self);

    };

        return float;
    })();
    ;

const __exported__ = {float}