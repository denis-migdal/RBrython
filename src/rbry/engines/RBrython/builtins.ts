export default {
    int  : require("!!raw-loader!../../corelib/int.py"  ).default,
    float: require("!!raw-loader!../../corelib/float.py").default,
    bool : require("!!raw-loader!../../corelib/bool.py" ).default,
    str  : require("!!raw-loader!../../corelib/str.py"  ).default
}