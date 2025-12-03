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

export type ASTNode<T={}> = {
    js_start?: number,
    js_end  ?: number
} & T;

export type BodyNode = ASTNode[];

export type ModuleNode = ASTNode<{
    body: BodyNode
}>;

export type ExprNode = ASTNode<{
    value: ASTNode
}>

export type ConstantNode = ASTNode<{
    value: number|string|boolean|{value: number|bigint}
}>
export type StringNode = ASTNode<{
    value: string;
}>

export type AssertNode = ASTNode<{
    test : ASTNode
    msg ?: string
}>

export type OperatorNode = unknown; // better to shadow it...

export type UnaryOpNode = ASTNode<{
    operand: ASTNode;
    op     : OperatorNode; 
}>

export type BinaryOpNode = ASTNode<{
    left : ASTNode;
    right: ASTNode;
    op   : OperatorNode;
}>
export type BoolOpNode = ASTNode<{
    op: OperatorNode;
    values: [ASTNode, ASTNode]
}>

export type CompareNode = ASTNode<{
    left       : ASTNode;
    ops        : OperatorNode[];
    comparators: ASTNode[];
}>

export type NameNode = ASTNode<{
    id: string;
}>

export type AssignNode = ASTNode<{
    value  : ASTNode;
    targets: ASTNode[];
}>

export type AugAssignNode = ASTNode<{
    target : ASTNode;
    value  : ASTNode;
    op     : OperatorNode;
}>


export type ReturnNode = ASTNode<{
    value  : ASTNode;
}>

export type PassNode = ASTNode<{}>

export type AttributeNode = ASTNode<{
    value: ASTNode;
    attr : string;
}>

export type CallNode = ASTNode<{
    func    : ASTNode
    args    : ASTNode[],
    keywords: {arg: string, value: ASTNode}[]
}>

export type ClassDefNode = ASTNode<{
    name: string;
    body: BodyNode;
    bases: ASTNode[];
}>

export type ArgsDefNode = ASTNode<{
    posonlyargs: ArgDefNode[];
    args       : ArgDefNode[];
    vararg    ?: ArgDefNode;
    kwonlyargs : ArgDefNode[];
    kwarg     ?: ArgDefNode;

    defaults   : ASTNode[];
    kw_defaults: ASTNode[];
}>

export type ArgDefNode = ASTNode<{
    arg: string
}>

export type LambdaDefNode = ASTNode<{
    args: ArgsDefNode;
    body: BodyNode;
}>

export type FunctionDefNode = ASTNode<{
    name: string;
    posonlyargs: ASTNode[];
    args: ArgsDefNode;
    body: BodyNode;
    decorator_list: ASTNode[]
}>

export type IfNode = ASTNode<{
    test: ASTNode;
    body: BodyNode;
    orelse: ASTNode[];
}>

export type WhileNode = ASTNode<{
    test: ASTNode;
    body: BodyNode;
    //TODO: orelse
}>

export type ForNode = ASTNode<{
    target: ASTNode;
    iter  : ASTNode;
    body  : BodyNode;
    //TODO: orelse
}>

export type RaiseNode = ASTNode<{
    exc: ASTNode;
}>

export type TryNode = ASTNode<{
    body: BodyNode;
    handlers: {body: BodyNode}[];
}>

export type FormattedValueNode = ASTNode<{
    value: ASTNode,
    format_spec?: {
        values: StringNode[]
    }
}>;

export type JoinedStrNode = ASTNode<{
    values: (FormattedValueNode|StringNode)[]
}>

export type MatchNode = ASTNode<{
    subject: ASTNode,
    cases  : {
        pattern: {
            cls: {
                id: string
            }
        }
        body: BodyNode
    }[]
}>

export type ImportNode = ASTNode<{
    names: {name: string, asname?: string}[]
}>

export type ImportFromNode = ASTNode<{
    module: string
    names: {name: string, asname?: string}[]
}>

export type SubscriptNode = ASTNode<{
    value: ASTNode,
    slice: ASTNode
}>

export type AwaitNode = ASTNode<{
    value: ASTNode
}>