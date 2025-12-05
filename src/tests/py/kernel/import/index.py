import JS

# getattr not implemented

from JS import console
#assert JS.console is console

import JS as JS2
assert JS is JS2

from JS import console as k
#assert JS.console is k 