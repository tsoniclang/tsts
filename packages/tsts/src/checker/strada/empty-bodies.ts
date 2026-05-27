/**
 * Empty-body detection.
 *
 * Ported from Strada `utilities.go` — isEmptyBlock,
 * isEmptyArrayLiteral, isEmptyObjectLiteral.
 *
 * Used by linters / unused-code checks; empty bodies trigger no
 * warnings in TS but are worth detecting in the diagnostics layer.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when a block has no statements.
 */
export function isEmptyBlock(node: AstNode): boolean {
  if (node.kind !== Kind.Block) return false;
  const statements = (node as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  return statements === undefined || statements.length === 0;
}

/**
 * Returns true when an array literal has no elements.
 */
export function isEmptyArrayLiteral(node: AstNode): boolean {
  if (node.kind !== Kind.ArrayLiteralExpression) return false;
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
  return elements === undefined || elements.length === 0;
}

/**
 * Returns true when an object literal has no properties.
 */
export function isEmptyObjectLiteral(node: AstNode): boolean {
  if (node.kind !== Kind.ObjectLiteralExpression) return false;
  const properties = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
  return properties === undefined || properties.length === 0;
}

/**
 * Returns true when a function-like has an empty body.
 */
export function hasEmptyBody(node: AstNode): boolean {
  const body = (node as unknown as { body?: AstNode }).body;
  if (body === undefined) return true;
  return isEmptyBlock(body);
}

/**
 * Returns true when a class declaration has no members.
 */
export function isEmptyClassBody(node: AstNode): boolean {
  if (node.kind !== Kind.ClassDeclaration && node.kind !== Kind.ClassExpression) return false;
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  return members === undefined || members.length === 0;
}

/**
 * Returns true when an interface has no members.
 */
export function isEmptyInterfaceBody(node: AstNode): boolean {
  if (node.kind !== Kind.InterfaceDeclaration) return false;
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  return members === undefined || members.length === 0;
}

/**
 * Returns true when a TypeLiteral has no members.
 */
export function isEmptyTypeLiteral(node: AstNode): boolean {
  if (node.kind !== Kind.TypeLiteral) return false;
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  return members === undefined || members.length === 0;
}
