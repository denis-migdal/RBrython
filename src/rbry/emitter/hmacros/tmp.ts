import { EmitContext } from "../EmitContext";

export default function tmp() {
    return function(ctx: EmitContext) {
        ctx.w`$RB.tmp()`;
    }
}