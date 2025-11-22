const {document,} = $RB.getModule("JS");
function foo(){
        $RB.setattr($RB.attr(document, "body"), "textContent", "ok");

    };

$B.imported["_"] = $B.jsobj2pyobj({foo});