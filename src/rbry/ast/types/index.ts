export const FUNCTION = 0;
export const CLASS    = 1;
export const BODY     = 1;

export type SymTab = {
    name    : string;
    children: SymTab[];
    symbols : {
        $strings: Record<string, number>
    }
    type: typeof FUNCTION|typeof CLASS|typeof BODY;
};

export type ParsedCode = {
    filename: string,
    pycode  : string,
    ast     : ModuleNode,
    symtable: SymTab,
};

export type ASTNode = {};

export type BodyNode = ASTNode[];

export type ModuleNode = {
    body: BodyNode
} & ASTNode;

export type ExprNode = {
    value: ASTNode
}

export type ConstantNode = {
    value: number|string|boolean|{value: number|bigint}
}

export type AssertNode = {
    test: ASTNode
}

export type OperatorNode = unknown; // better to shadow it...

export type UnaryOpNode = {
    operand: ASTNode;
    op     : OperatorNode; 
}

export type BinaryOpNode = {
    left : ASTNode;
    right: ASTNode;
    op   : OperatorNode;
}

export type CompareNode = {
    left       : ASTNode;
    ops        : OperatorNode[];
    comparators: ASTNode[];
}

export type NameNode = {
    id: string;
}

export type AssignNode = {
    value  : ASTNode;
    targets: ASTNode[];
}

export type AugAssignNode = {
    target : ASTNode;
    value  : ASTNode;
    op     : OperatorNode;
}


export type ReturnNode = {
    value  : ASTNode;
}

export type PassNode = {}

export type AttributeNode = {
    value: ASTNode;
    attr : string;
}

export type CallNode = {
    func    : ASTNode
    args    : ASTNode[],
    keywords: ASTNode[]
}

export type ClassDefNode = {
    name: string;
    body: BodyNode;
    bases: ASTNode[];
}

export type FunctionDefNode = {
    name: string;
    posonlyargs: ASTNode[];
    args: {
        posonlyargs: ASTNode[];
        args       : ASTNode[];
    };
    body: BodyNode;
    decorator_list: ASTNode[]
}

export type IfNode = {
    test: ASTNode;
    body: BodyNode;
    orelse: ASTNode[];
}

export type WhileNode = {
    test: ASTNode;
    body: BodyNode;
    //TODO: orelse
}

export type ForNode = {
    target: ASTNode;
    iter  : ASTNode;
    body  : BodyNode;
    //TODO: orelse
}

export type RaiseNode = {
    exc: ASTNode;
}

export type TryNode = {
    body: BodyNode;
    handlers: ASTNode[];
}

export type JoinedStrNode = {
    values: ASTNode[]
}