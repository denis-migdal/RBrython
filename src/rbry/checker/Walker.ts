import { nodeType } from "../ast";
import { ASTNode, ParsedCode, SymTab } from "../ast/types";
import handlers from "./handlers";
import { TypeDesc } from "./types";

export type TypedASTNode<T extends ASTNode = ASTNode> = T & {result_type: TypeDesc}
export type TypedSymTab     = SymTab & {typedSymbols: Record<string, TypeDesc>}

export type Entry<T extends ASTNode = ASTNode> = {
    node  : T,
    symtab: SymTab
}
export type TypedEntry<T extends ASTNode = ASTNode> = Entry<TypedASTNode<T>>
                                                    & {symtab: TypedSymTab};

export function walk(parsed: ParsedCode) {

    const pending = new Array<Entry>();

    for(let i = 0; i < parsed.ast.body.length; ++i)
        pending.push({
            symtab: parsed.symtable,
            node  : parsed.ast.body[i]
        })

    const toProcess = new Array<TypedEntry>();
    
    let elem: Entry|undefined;
    while( elem = pending.pop() ) {

        toProcess.push(elem as any);

        for( let node of getChildren(elem.node) )
            pending.push({
                node,
                symtab: elem.symtab
            });
        
        // @ts-ignore
        if( elem.node.body) {

            let symtab = elem.symtab;
            const type = nodeType(elem.node);

            if( type === "FunctionDef" || type === "ClassDef")
                // @ts-ignore
                symtab = symtab.children.find(e => e.name === elem.node.name)!;

            // @ts-ignore
            for(let i = 0; i < elem.node.body.length ; ++i ) {
                pending.push({
                    // @ts-ignore
                    node  : elem.node.body[i],
                    symtab
                });
            }
        }
    }

    let entry: TypedEntry|undefined;
    while( entry = toProcess.pop() ) {

        const handler = handlers[nodeType(entry.node) as keyof typeof handlers];
        if( handler === undefined) {
            //
            continue;
        }
        
        handler(entry);
    }
}

function getChildren(elem: ASTNode): ASTNode[] {
    return [...Object.values(elem)].filter(e => typeof e === "object"
                                            // @ts-ignore
                                        && e.constructor.$name !== undefined);
}