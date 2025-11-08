import { ConstantNode } from "@SBrython/rbry/ast/types";

export default function Constant(node: ConstantNode) {

        const type = typeof node.value;

        if( type === "object") {
            // @ts-ignore
            const value: float|bigint = node.value.value;
            const stype = typeof value;
            if( stype === "number") return `${value}`;
            if( stype === "bigint") return `${value}n`;
        }
        if( type === "string" ) return `"${node.value}"`;
        if( type === "number" ) return `${node.value}n`; // bigint
        if( type === "boolean") return `${node.value}`;

        console.warn(node, type);
        throw new Error(`Unknown Cste ${type}`);
}