;
var bool = (() =>{
        function bool() {
            return Object.create(bool.prototype);
        }
    bool.prototype.__eq__ = function __eq__(o, ){const self = this;
        return self == o;

    };

        return bool;
    })();
    ;

const __exported__ = {bool}