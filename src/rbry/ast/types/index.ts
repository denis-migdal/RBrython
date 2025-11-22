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

export type ASTNode<T={}> = {} & T;

export type BodyNode = ASTNode[];

export type ModuleNode = ASTNode<{
    body: BodyNode
}>;

export type ExprNode = {
    value: ASTNode
}

export type ConstantNode = {
    value: number|string|boolean|{value: number|bigint}
}
export type StringNode = {
    value: string;
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
export type BoolOpNode = {
    op: OperatorNode;
    values: [ASTNode, ASTNode]
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
    keywords: {arg: string, value: ASTNode}[]
}

export type ClassDefNode = {
    name: string;
    body: BodyNode;
    bases: ASTNode[];
}

export type ArgsDefNode = {
    posonlyargs: ArgDefNode[];
    args       : ArgDefNode[];
}

export type ArgDefNode = {
    arg: string
}

export type LambdaDefNode = {
    args: ArgsDefNode;
    body: BodyNode;
}

export type FunctionDefNode = {
    name: string;
    posonlyargs: ASTNode[];
    args: ArgsDefNode;
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
    handlers: {body: BodyNode}[];
}

export type JoinedStrNode = {
    values: {value: string|ASTNode}[]
}

export type MatchNode = {
    subject: ASTNode,
    cases  : {
        pattern: {
            cls: {
                id: string
            }
        }
        body: BodyNode
    }[]
}

export type ImportNode = {
    names: {name: string}[]
}

export type ImportFromNode = {
    module: string
    names: {name: string}[]
}