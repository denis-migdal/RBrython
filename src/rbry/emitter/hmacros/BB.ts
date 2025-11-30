import { EmitContext } from "../EmitContext";

export default function BB() {
    return function(ctx: EmitContext) {
        ++ctx.indent_level;
        ctx.w_line();
    }
}

