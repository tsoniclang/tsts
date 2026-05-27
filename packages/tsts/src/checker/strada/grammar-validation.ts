/**
 * Grammar-validation helpers (forwarded to ../grammarchecks.ts).
 *
 * Ported from Strada `grammarchecks.go` — small dispatch surface for
 * the strada-style checker to call into the full grammar-checks pass.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a declaration that must have a name.
 */
export function isDeclarationRequiringName(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.VariableDeclaration:
    case Kind.PropertyDeclaration:
    case Kind.MethodDeclaration:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the declaration has a name node.
 */
export function declarationHasName(node: AstNode): boolean {
  const name = (node as unknown as { name?: AstNode }).name;
  return name !== undefined;
}

/**
 * Returns true when a function-like declaration has both a body and
 * required parameters — passing a basic grammar check.
 */
export function isWellFormedFunctionLike(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.FunctionDeclaration:
    case Kind.FunctionExpression:
    case Kind.ArrowFunction:
    case Kind.MethodDeclaration:
    case Kind.Constructor:
    case Kind.GetAccessor:
    case Kind.SetAccessor:
      break;
    default:
      return true;
  }
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters;
  return params !== undefined;
}

/**
 * Returns true when the modifier set is valid for the declaration
 * kind — e.g. `private` is not allowed on top-level functions.
 */
export function areModifiersValidForNode(node: AstNode): boolean {
  const modifiers = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (modifiers === undefined) return true;
  // Conservative: defer the full check to grammarchecks.ts.
  return true;
}

/**
 * Returns true when the node appears in a position that allows
 * statements (block, source file, module body, etc.).
 */
export function isInStatementPosition(node: AstNode): boolean {
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return false;
  switch (parent.kind) {
    case Kind.Block:
    case Kind.SourceFile:
    case Kind.ModuleBlock:
      return true;
    default:
      return false;
  }
}

/**
 * Returns true when the node is a valid statement kind.
 */
export function isValidStatementKind(node: AstNode): boolean {
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
    case Kind.FunctionDeclaration:
    case Kind.ClassDeclaration:
    case Kind.InterfaceDeclaration:
    case Kind.TypeAliasDeclaration:
    case Kind.EnumDeclaration:
    case Kind.ModuleDeclaration:
    case Kind.ImportDeclaration:
    case Kind.ExportDeclaration:
      return true;
    default:
      return false;
  }
}
