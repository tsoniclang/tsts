/**
 * Syntactic classification of AST nodes.
 *
 * Ported from Strada `utilities.go` — categorizes nodes by their
 * syntactic role (statement, expression, declaration, modifier, etc.).
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

export const NodeClass = {
  Statement: 0,
  Expression: 1,
  Declaration: 2,
  TypeNode: 3,
  Modifier: 4,
  Keyword: 5,
  Token: 6,
  Other: 7,
} as const;

export type NodeClass =
  | typeof NodeClass.Statement
  | typeof NodeClass.Expression
  | typeof NodeClass.Declaration
  | typeof NodeClass.TypeNode
  | typeof NodeClass.Modifier
  | typeof NodeClass.Keyword
  | typeof NodeClass.Token
  | typeof NodeClass.Other;

/**
 * Returns the broad syntactic class of a node.
 */
export function classifyNode(node: AstNode): NodeClass {
  switch (node.kind) {
    case Kind.Block:
    case Kind.VariableStatement:
    case Kind.ExpressionStatement:
    case Kind.IfStatement:
    case Kind.DoStatement:
    case Kind.WhileStatement:
    case Kind.ForStatement:
    case Kind.ForInStatement:
    case Kind.ForOfStatement:
    case Kind.ContinueStatement:
    case Kind.BreakStatement:
    case Kind.ReturnStatement:
    case Kind.WithStatement:
    case Kind.SwitchStatement:
    case Kind.LabeledStatement:
    case Kind.ThrowStatement:
    case Kind.TryStatement:
    case Kind.DebuggerStatement:
    case Kind.EmptyStatement:
      return NodeClass.Statement;

    case Kind.Identifier:
    case Kind.StringLiteral:
    case Kind.NumericLiteral:
    case Kind.BigIntLiteral:
    case Kind.RegularExpressionLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
    case Kind.TemplateExpression:
    case Kind.ArrayLiteralExpression:
    case Kind.ObjectLiteralExpression:
    case Kind.PropertyAccessExpression:
    case Kind.ElementAccessExpression:
    case Kind.CallExpression:
    case Kind.NewExpression:
    case Kind.ParenthesizedExpression:
    case Kind.FunctionExpression:
    case Kind.ClassExpression:
    case Kind.ArrowFunction:
    case Kind.TypeAssertionExpression:
    case Kind.AsExpression:
    case Kind.SatisfiesExpression:
    case Kind.NonNullExpression:
    case Kind.AwaitExpression:
    case Kind.YieldExpression:
    case Kind.PrefixUnaryExpression:
    case Kind.PostfixUnaryExpression:
    case Kind.BinaryExpression:
    case Kind.ConditionalExpression:
    case Kind.DeleteExpression:
    case Kind.TypeOfExpression:
    case Kind.VoidExpression:
    case Kind.SpreadElement:
      return NodeClass.Expression;

    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.VariableDeclaration:
    case Kind.Parameter:
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration:
    case Kind.PropertySignature:
    case Kind.MethodSignature:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
    case Kind.ImportDeclaration:
    case Kind.ExportDeclaration:
    case Kind.TypeParameter:
    case Kind.EnumMember:
      return NodeClass.Declaration;

    case Kind.TypeReference:
    case Kind.FunctionType:
    case Kind.ConstructorType:
    case Kind.UnionType:
    case Kind.IntersectionType:
    case Kind.ArrayType:
    case Kind.TupleType:
    case Kind.TypeLiteral:
    case Kind.LiteralType:
    case Kind.MappedType:
    case Kind.ConditionalType:
    case Kind.InferType:
    case Kind.IndexedAccessType:
    case Kind.TypeOperator:
    case Kind.ParenthesizedType:
    case Kind.RestType:
    case Kind.OptionalType:
    case Kind.NamedTupleMember:
    case Kind.ThisType:
    case Kind.TypeQuery:
    case Kind.TypePredicate:
      return NodeClass.TypeNode;

    case Kind.PublicKeyword:
    case Kind.PrivateKeyword:
    case Kind.ProtectedKeyword:
    case Kind.StaticKeyword:
    case Kind.ReadonlyKeyword:
    case Kind.AbstractKeyword:
    case Kind.AsyncKeyword:
    case Kind.OverrideKeyword:
    case Kind.ExportKeyword:
    case Kind.DefaultKeyword:
    case Kind.DeclareKeyword:
    case Kind.ConstKeyword:
      return NodeClass.Modifier;

    default:
      return NodeClass.Other;
  }
}

/**
 * Returns true when the node is a Statement.
 */
export function isStatementNode(node: AstNode): boolean {
  return classifyNode(node) === NodeClass.Statement;
}

/**
 * Returns true when the node is an Expression.
 */
export function isExpressionNode(node: AstNode): boolean {
  return classifyNode(node) === NodeClass.Expression;
}

/**
 * Returns true when the node is a Declaration.
 */
export function isDeclarationNode(node: AstNode): boolean {
  return classifyNode(node) === NodeClass.Declaration;
}

/**
 * Returns true when the node is a TypeNode.
 */
export function isTypeNodeKind(node: AstNode): boolean {
  return classifyNode(node) === NodeClass.TypeNode;
}

/**
 * Returns true when the node is a Modifier keyword.
 */
export function isModifierKind(node: AstNode): boolean {
  return classifyNode(node) === NodeClass.Modifier;
}
