import { EmitContext } from "../EmitContext";

export default function NL() {
    return function(ctx: EmitContext) {
        ctx.w_line();
    }
}