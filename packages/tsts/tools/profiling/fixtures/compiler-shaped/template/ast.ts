export const enum SyntaxKind {
  Unknown,
  Identifier,
  NumericLiteral,
  StringLiteral,
  BinaryExpression,
  CallExpression,
  PropertyAccessExpression,
  VariableDeclaration,
  FunctionDeclaration,
  Block,
  ReturnStatement,
}

export interface TextRange {
  readonly pos: number;
  readonly end: number;
}

export interface NodeBase extends TextRange {
  readonly kind: SyntaxKind;
  readonly flags: number;
}

export interface Identifier extends NodeBase {
  readonly kind: SyntaxKind.Identifier;
  readonly text: string;
}

export interface NumericLiteral extends NodeBase {
  readonly kind: SyntaxKind.NumericLiteral;
  readonly value: number;
}

export interface StringLiteral extends NodeBase {
  readonly kind: SyntaxKind.StringLiteral;
  readonly text: string;
}

export type Literal = NumericLiteral | StringLiteral;

export interface BinaryExpression extends NodeBase {
  readonly kind: SyntaxKind.BinaryExpression;
  readonly left: Expression;
  readonly operator: "+" | "-" | "*" | "/" | "===";
  readonly right: Expression;
}

export interface CallExpression extends NodeBase {
  readonly kind: SyntaxKind.CallExpression;
  readonly expression: Expression;
  readonly arguments: readonly Expression[];
}

export interface PropertyAccessExpression extends NodeBase {
  readonly kind: SyntaxKind.PropertyAccessExpression;
  readonly expression: Expression;
  readonly name: Identifier;
}

export type Expression = Identifier | Literal | BinaryExpression | CallExpression | PropertyAccessExpression;

export interface VariableDeclaration extends NodeBase {
  readonly kind: SyntaxKind.VariableDeclaration;
  readonly name: Identifier;
  readonly initializer?: Expression;
}

export interface ReturnStatement extends NodeBase {
  readonly kind: SyntaxKind.ReturnStatement;
  readonly expression?: Expression;
}

export interface Block extends NodeBase {
  readonly kind: SyntaxKind.Block;
  readonly statements: readonly Statement[];
}

export interface FunctionDeclaration extends NodeBase {
  readonly kind: SyntaxKind.FunctionDeclaration;
  readonly name: Identifier;
  readonly parameters: readonly VariableDeclaration[];
  readonly body: Block;
}

export type Statement = VariableDeclaration | ReturnStatement | FunctionDeclaration | Block;
export type Node = Expression | Statement;

export type NodeForKind<K extends Node["kind"]> = Extract<Node, { readonly kind: K }>;
export type Visitor<R> = { readonly [K in Node["kind"]]: (node: NodeForKind<K>) => R };

export function visitNode<R>(node: Node, visitor: Visitor<R>): R {
  switch (node.kind) {
    case SyntaxKind.Identifier: return visitor[SyntaxKind.Identifier](node);
    case SyntaxKind.NumericLiteral: return visitor[SyntaxKind.NumericLiteral](node);
    case SyntaxKind.StringLiteral: return visitor[SyntaxKind.StringLiteral](node);
    case SyntaxKind.BinaryExpression: return visitor[SyntaxKind.BinaryExpression](node);
    case SyntaxKind.CallExpression: return visitor[SyntaxKind.CallExpression](node);
    case SyntaxKind.PropertyAccessExpression: return visitor[SyntaxKind.PropertyAccessExpression](node);
    case SyntaxKind.VariableDeclaration: return visitor[SyntaxKind.VariableDeclaration](node);
    case SyntaxKind.FunctionDeclaration: return visitor[SyntaxKind.FunctionDeclaration](node);
    case SyntaxKind.Block: return visitor[SyntaxKind.Block](node);
    case SyntaxKind.ReturnStatement: return visitor[SyntaxKind.ReturnStatement](node);
  }
}

export function identifier(text: string, pos: number): Identifier {
  return { kind: SyntaxKind.Identifier, flags: 0, pos, end: pos + text.length, text };
}
