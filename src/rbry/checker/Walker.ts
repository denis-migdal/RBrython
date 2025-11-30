import { nodeType } from "../ast";
import { ASTNode, FunctionDefNode, ParsedCode, SymTab } from "../ast/types";

type Type = {}

type TypedASTNode<T> = ASTNode<T> & {result_type: Type}
type TypedSymTab     = SymTab & {typedSymbols: Record<string, Type>}

type Entry<T extends ASTNode = ASTNode> = {
    node  : T,
    symtab: SymTab
}
type TypedEntry<T extends ASTNode = ASTNode> = Entry<TypedASTNode<T>>
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

        const x = nodeType(entry.node);

        if( x === "FunctionDef" )
            // @ts-ignore
            processFunctionDef(entry);
    }
}

function getChildren(elem: ASTNode): ASTNode[] {
    return [...Object.values(elem)].filter(e => typeof e === "object"
                                            // @ts-ignore
                                        && e.constructor.$name !== undefined);
}

export const FunctionType = Symbol();

function processFunctionDef(entry: TypedEntry<FunctionDefNode>) {
    (entry.symtab.typedSymbols ||= {})[entry.node.name] = FunctionType;
}