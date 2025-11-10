import { ConstantNode } from "@SBrython/rbry/ast/types";

export default function Constant(node: ConstantNode) {

        const type = typeof node.value;

        if( type === "object") {
            // @ts-ignore
            const qname = node.value.__class__.__qualname__
            // @ts-ignore
            const value: float|bigint = node.value.value;

            if( qname === "float"   ) return `$RB.lit(${value})`;
            if( qname === "int"     ) return `$RB.lit(${value}n)`;
            if( qname === "NoneType") return "$RB.lit(null)";
            //if( qname === "ellipsis") return "$RB.ellipsis";
        }
        if( type === "string" ) return `$RB.lit("${node.value}")`;
        if( type === "number" ) return `$RB.lit(${node.value}n)`; // bigint
        if( type === "boolean") return `$RB.lit(${node.value})`;

        console.warn(node, type);
        throw new Error(`Unknown Cste ${type}`);
}