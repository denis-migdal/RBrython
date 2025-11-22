import { ConstantNode } from "../../../ast/types";
import { EmitContext } from "../../EmitContext";

export default function Constant(node: ConstantNode, ctx: EmitContext) {

        const type = typeof node.value;

        if( type === "object") {
            // @ts-ignore
            const qname = node.value.__class__.__qualname__
            // @ts-ignore
            const value: float|bigint = node.value.value;

            if( qname === "float"   ) return ctx.w`${value}`;
            if( qname === "int"     ) return ctx.w`${value}n`;
            if( qname === "NoneType") return ctx.w`null`;
            //if( qname === "ellipsis") return "$RB.ellipsis";
        }
        if( type === "string" ) return ctx.w`"${node.value}"`;
        if( type === "number" ) return ctx.w`${node.value}n`; // bigint
        if( type === "boolean") return ctx.w`${node.value}`;

        console.warn(node, type);
        throw new Error(`Unknown Cste ${type}`);
}