import { ConstantNode } from "@SBrython/rbry/ast/types";

export default function Constant(node: ConstantNode) {

        const type = typeof node.value;

        if( type === "object") {
            // @ts-ignore
            const qname = node.value.__class__.__qualname__
            // @ts-ignore
            const value: float|bigint = node.value.value;

            if( qname === "float"   ) return `${value}`;
            if( qname === "int"     ) return `${value}n`;
            if( qname === "NoneType") return "null";
        }
        if( type === "string" ) return `"${node.value}"`;
        if( type === "number" ) return `${node.value}n`; // bigint
        if( type === "boolean") return `${node.value}`;

        console.warn(node, type);
        throw new Error(`Unknown Cste ${type}`);
}