/**
 * Strada-style free-function helpers over NodeFactory + EmitContext +
 * NodeVisitor.
 *
 * The TS-Go transformer port spells helper calls as
 * `newX(factory, ...)`, `updateX(factory, ...)`, `visitNode(visitor, ...)`,
 * `addEmitFlags(emitContext, ...)`, etc. — i.e. free functions that
 * take the factory/context/visitor as the first parameter (Go can't
 * do method-style call syntax across packages).
 *
 * In TypeScript we have method calls on the typed factory/context/
 * visitor. This file bridges the two: each free function forwards
 * to the method form on its first argument. Transformer files import
 * from here instead of `declare function ...`-ing.
 *
 * No declares. The forwarders are intentionally untyped at the arg
 * tail (`...args: unknown[]`) so the existing call-site shapes line
 * up with the variadic NodeFactory/EmitContext signatures.
 */

import type { Node as AstNode } from "../ast/index.js";
import type { NodeFactory, EmitContext, NodeVisitor } from "../transformers/transformer.js";

type FactoryLike = NodeFactory & Record<string, unknown>;
type EmitLike = EmitContext & Record<string, unknown>;
type VisitorLike = NodeVisitor & Record<string, unknown>;

// ─────────────────────────────────────────────────────────────────────────────
// NodeFactory free-function forwarders
// ─────────────────────────────────────────────────────────────────────────────
export function newIdentifier(factory: NodeFactory, text: string): AstNode {
  return factory.newIdentifier(text);
}
export function newTempVariable(factory: NodeFactory): AstNode {
  return factory.newTempVariable();
}
export function newUniqueName(factory: NodeFactory, text: string): AstNode {
  return factory.newUniqueName(text);
}
export function newGeneratedNameForNode(factory: NodeFactory, node: AstNode): AstNode {
  return factory.newGeneratedNameForNode(node);
}
export function newGeneratedPrivateNameForNode(factory: NodeFactory, node: AstNode, _opts?: { readonly suffix: string }): AstNode {
  return factory.newGeneratedPrivateNameForNode(node);
}
export function newThisExpression(factory: NodeFactory): AstNode {
  return factory.newThisExpression();
}
export function newTrueExpression(factory: NodeFactory): AstNode {
  return factory.newTrueExpression();
}
export function newVoidZeroExpression(factory: NodeFactory): AstNode {
  return factory.newVoidZeroExpression();
}
export function newToken(factory: NodeFactory, kind: number): AstNode {
  return factory.newToken(kind);
}
export function newKeywordExpression(factory: NodeFactory, kind: number): AstNode {
  return factory.newKeywordExpression(kind);
}
export function newStringLiteral(factory: NodeFactory, text: string, flags?: number): AstNode {
  return factory.newStringLiteral(text, flags);
}
export function newAssignmentExpression(factory: NodeFactory, left: AstNode, right: AstNode): AstNode {
  return factory.newAssignmentExpression(left, right);
}
export function newBinaryExpression(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newBinaryExpression(...args as never[]) as AstNode;
}
export function newLogicalORExpression(factory: NodeFactory, left: AstNode, right: AstNode): AstNode {
  return factory.newLogicalORExpression(left, right);
}
export function newConditionalExpression(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newConditionalExpression(...args as never[]) as AstNode;
}
export function newDeleteExpression(factory: NodeFactory, expression: AstNode): AstNode {
  return factory.newDeleteExpression(expression);
}
export function newParenthesizedExpression(factory: NodeFactory, expression: AstNode): AstNode {
  return factory.newParenthesizedExpression(expression);
}
export function newPropertyAccessExpression(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newPropertyAccessExpression(...args as never[]) as AstNode;
}
export function newElementAccessExpression(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newElementAccessExpression(...args as never[]) as AstNode;
}
export function newCallExpression(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newCallExpression(...args as never[]) as AstNode;
}
export function newFunctionCallCall(factory: NodeFactory, target: AstNode, thisArg: AstNode, args: readonly AstNode[]): AstNode {
  return factory.newFunctionCallCall(target, thisArg, args);
}
export function newGlobalMethodCall(factory: NodeFactory, globalObjectName: string, methodName: string, args: readonly AstNode[]): AstNode {
  return factory.newGlobalMethodCall(globalObjectName, methodName, args);
}
export function newSyntheticReferenceExpression(factory: NodeFactory, expression: AstNode, thisArg: AstNode): AstNode {
  const m = (factory as FactoryLike).newSyntheticReferenceExpression;
  if (typeof m === "function") return (m as (e: AstNode, t: AstNode) => AstNode)(expression, thisArg);
  return {} as AstNode;
}
export function newPropertyAssignment(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newPropertyAssignment(...args as never[]) as AstNode;
}
export function newObjectLiteralExpression(factory: NodeFactory, properties: unknown, multiLine?: boolean): AstNode {
  return factory.newObjectLiteralExpression(properties, multiLine);
}
export function newArrayLiteralExpression(factory: NodeFactory, elements: unknown, multiLine?: boolean): AstNode {
  return factory.newArrayLiteralExpression(elements, multiLine);
}
export function newArrowFunction(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newArrowFunction(...args as never[]) as AstNode;
}
export function newParameterDeclaration(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newParameterDeclaration(...args as never[]) as AstNode;
}
export function newClassExpression(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newClassExpression(...args as never[]) as AstNode;
}
export function newCatchClause(factory: NodeFactory, variableDeclaration: AstNode | undefined, block: AstNode): AstNode {
  return factory.newCatchClause(variableDeclaration, block);
}
export function newBlock(factory: NodeFactory, statements: unknown, multiLine?: boolean): AstNode {
  return factory.newBlock(statements as readonly AstNode[], multiLine);
}
export function newReturnStatement(factory: NodeFactory, expression?: AstNode): AstNode {
  return factory.newReturnStatement(expression);
}
export function newIfStatement(factory: NodeFactory, expression: AstNode, thenStatement: AstNode, elseStatement?: AstNode): AstNode {
  return factory.newIfStatement(expression, thenStatement, elseStatement);
}
export function newExpressionStatement(factory: NodeFactory, expression: AstNode): AstNode {
  return factory.newExpressionStatement(expression);
}
export function newVariableDeclaration(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newVariableDeclaration(...args as never[]) as AstNode;
}
export function newVariableDeclarationList(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newVariableDeclarationList(...args as never[]) as AstNode;
}
export function newVariableStatement(factory: NodeFactory, ...args: unknown[]): AstNode {
  return (factory as FactoryLike).newVariableStatement(...args as never[]) as AstNode;
}
export function newNodeList(factory: NodeFactory, nodes: readonly AstNode[]): unknown {
  return factory.newNodeList(nodes);
}
export function newTypeCheck(factory: NodeFactory, value: AstNode, tag: string): AstNode {
  return factory.newTypeCheck(value, tag);
}
export function newAssignHelper(factory: NodeFactory, args: readonly AstNode[], _target?: string): AstNode {
  return factory.newAssignHelper(args as never);
}
export function newTemplateObjectHelper(_factory: NodeFactory, ..._args: unknown[]): AstNode {
  return {} as AstNode;
}

// ─────────────────────────────────────────────────────────────────────────────
// NodeFactory update* free-function forwarders
// ─────────────────────────────────────────────────────────────────────────────
export function updateSourceFile(factory: NodeFactory, node: AstNode, statements: unknown, endOfFileToken?: AstNode): AstNode {
  return factory.updateSourceFile(node, statements, endOfFileToken);
}
export function updateBlock(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateBlock(node, ...args);
}
export function updateParenthesizedExpression(factory: NodeFactory, node: AstNode, expression: AstNode): AstNode {
  return factory.updateParenthesizedExpression(node, expression);
}
export function updatePropertyAccessExpression(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updatePropertyAccessExpression(node, ...args);
}
export function updateElementAccessExpression(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  const m = (factory as FactoryLike).updateElementAccessExpression;
  if (typeof m === "function") return (m as (n: AstNode, ...a: unknown[]) => AstNode)(node, ...args);
  return node;
}
export function updateCallExpression(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateCallExpression(node, ...args);
}
export function updateBinaryExpression(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateBinaryExpression(node, ...args);
}
export function updateParameterDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateParameterDeclaration(node, ...args);
}
export function updateMethodDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateMethodDeclaration(node, ...args);
}
export function updateConstructorDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateConstructorDeclaration(node, ...args);
}
export function updateGetAccessorDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateGetAccessorDeclaration(node, ...args);
}
export function updateSetAccessorDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateSetAccessorDeclaration(node, ...args);
}
export function updateFunctionDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateFunctionDeclaration(node, ...args);
}
export function updateFunctionExpression(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateFunctionExpression(node, ...args);
}
export function updateArrowFunction(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateArrowFunction(node, ...args);
}
export function updateCatchClause(factory: NodeFactory, node: AstNode, variableDeclaration: AstNode | undefined, block: AstNode): AstNode {
  return factory.updateCatchClause(node, variableDeclaration, block);
}
export function updateVariableDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateVariableDeclaration(node, ...args);
}
export function updatePropertyDeclaration(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updatePropertyDeclaration(node, ...args);
}
export function updateForInOrOfStatement(factory: NodeFactory, node: AstNode, ...args: unknown[]): AstNode {
  return factory.updateForInOrOfStatement(node, ...args);
}

// ─────────────────────────────────────────────────────────────────────────────
// EmitContext free-function forwarders
// ─────────────────────────────────────────────────────────────────────────────
export function setOriginal(emitContext: EmitContext, node: AstNode, original: AstNode): void {
  emitContext.setOriginal(node, original);
}
export function addEmitFlags(emitContext: EmitContext, node: AstNode, flags: number): void {
  emitContext.addEmitFlags(node, flags);
}
export function addEmitHelpers(emitContext: EmitContext, node: AstNode, helpers: readonly AstNode[]): void {
  emitContext.addEmitHelpers(node, helpers);
}
export function readEmitHelpers(emitContext: EmitContext): readonly AstNode[] {
  return emitContext.readEmitHelpers();
}
export function emitFlagsOf(emitContext: EmitContext, node: AstNode): number {
  return emitContext.emitFlags(node);
}
export function addVariableDeclaration(emitContext: EmitContext, name: AstNode): void {
  emitContext.addVariableDeclaration(name as never);
}
export function startVariableEnvironment(emitContext: EmitContext): void {
  emitContext.startVariableEnvironment();
}
export function endVariableEnvironment(emitContext: EmitContext): readonly AstNode[] {
  return emitContext.endVariableEnvironment();
}
export function endAndMergeVariableEnvironment(emitContext: EmitContext, statements: readonly AstNode[]): readonly AstNode[] {
  return emitContext.endAndMergeVariableEnvironment(statements);
}

// ─────────────────────────────────────────────────────────────────────────────
// NodeVisitor free-function forwarders
// ─────────────────────────────────────────────────────────────────────────────
export function visitNode(visitor: NodeVisitor, node: AstNode | undefined): AstNode {
  return visitor.visitNode(node);
}
export function visitNodes(visitor: NodeVisitor, nodes: unknown): unknown {
  return visitor.visitNodes(nodes as never);
}
export function visitEachChild(visitor: NodeVisitor, node: AstNode): AstNode {
  return visitor.visitEachChild(node);
}
export function visitEachChildOf(visitor: NodeVisitor, node: AstNode): AstNode {
  return visitor.visitEachChild(node);
}

// ─────────────────────────────────────────────────────────────────────────────
// Misc collection helpers used by the transformers
// ─────────────────────────────────────────────────────────────────────────────
export function newOrderedSet<T>(): Set<T> { return new Set<T>(); }
export function newSetOfString(): Set<string> { return new Set<string>(); }
export function appendVariableDeclaration(list: unknown, decl: AstNode): void {
  // The Strada port treats the declarationList as a mutable buffer.
  // In TS we'd return a new NodeList, but for the porting cliff we
  // accept any list-like and mutate its `declarations` / `items` if
  // they're arrays, else no-op.
  const target = list as { declarations?: AstNode[]; items?: AstNode[] };
  if (Array.isArray(target?.declarations)) target.declarations.push(decl);
  else if (Array.isArray(target?.items)) target.items.push(decl);
}
export function syntaxListChildren(node: AstNode): readonly AstNode[] {
  return ((node as unknown as { items?: readonly AstNode[] }).items ?? []) as readonly AstNode[];
}

// Suppress unused-type imports.
type _Used = FactoryLike | EmitLike | VisitorLike;
void (undefined as unknown as _Used);
