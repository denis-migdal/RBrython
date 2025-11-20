;
;
var str = (() =>{
        function str() {
            return Object.create(str.prototype);
        }
    str.prototype.__new__ = function __new__(o, ){const cls = this;
        return $RB.call(__JS_AS_STRING__, o, );

    };
str.prototype.__eq__ = function __eq__(o, ){const self = this;
        return self == o;

    };
str.prototype.__mul__ = function __mul__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self.repeat(Number(b));

        }else {
            return NotImplemented;

    }};

    };
str.prototype.__rmul__ = function __rmul__(o, ){const self = this;
        {const tname = type(o).name;if( tname === "int") {
            return self.repeat(Number(b));

        }else {
            return NotImplemented;

    }};

    };

        return str;
    })();
    ;

const __exported__ = {str}