import { EmitContext } from "../EmitContext";

export default function getTmp() {
    return function(ctx: EmitContext) {
        ctx.w`$RB.getTmp()`;
    }
}