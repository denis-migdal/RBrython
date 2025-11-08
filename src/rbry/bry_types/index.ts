export type ASTNode = Body|{};

export type Body = Node[];

export type Module = {
    body: Body
}

export type Value = {
    value: ASTNode
}

export type Int = {
    value: number
}