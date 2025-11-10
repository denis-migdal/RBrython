from functools import singledispatchmethod
from types     import NotImplementedType

class str:
    def __new__(cls, o: object, /) -> str:
        return __JS_FROM__(__JS_AS_STRING__(o)) # type: ignore
        #return type(o).__str__(o) # type: ignore
    
    def __eq__(self, o: object, /) -> bool:
        return __JS_FROM_OPI__(self, "==", o) # type: ignore

# export class str {
#     __int__(base?: bigint) {
#         if( base === undefined)
#             return BigInt(this);

#         if( base === 16n) {
#             let result: bigint = 0n;

#             for(let i = 2; i < this.length; ++i) {

#                 result = result << 4n + BigInt( parseInt(this.slice(i, i+8), 16) );
#             }

#             return result;
#         }

#         throw new Error("?");
#     }
# }