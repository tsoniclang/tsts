/**
 * Class static initializer block handling.
 *
 * Ported from Strada `checker.go` — checkClassStaticBlock,
 * isClassStaticBlockDeclaration, getStaticBlockStatements.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a ClassStaticBlockDeclaration.
 */
export function isClassStaticBlock(node: AstNode): boolean {
  return node.kind === Kind.ClassStaticBlockDeclaration;
}

/**
 * Returns the body of a class static block.
 */
export function getStaticBlockBody(node: AstNode): AstNode | undefined {
  if (!isClassStaticBlock(node)) return undefined;
  return (node as unknown as { body?: AstNode }).body;
}

/**
 * Returns the statements inside a class static block.
 */
export function getStaticBlockStatements(node: AstNode): readonly AstNode[] {
  const body = getStaticBlockBody(node);
  if (body === undefined) return [];
  if (body.kind !== Kind.Block) return [];
  const statements = (body as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements;
  return statements?.nodes ?? [];
}

/**
 * Returns true when the block is empty (no statements).
 */
export function isEmptyStaticBlock(node: AstNode): boolean {
  return getStaticBlockStatements(node).length === 0;
}

/**
 * Returns the enclosing class declaration of a static block.
 */
export function getEnclosingClassOfStaticBlock(node: AstNode): AstNode | undefined {
  if (!isClassStaticBlock(node)) return undefined;
  const parent = (node as unknown as { parent?: AstNode }).parent;
  if (parent === undefined) return undefined;
  if (parent.kind === Kind.ClassDeclaration || parent.kind === Kind.ClassExpression) {
    return parent;
  }
  return undefined;
}

/**
 * Returns true when the static block can use `await` (top-level
 * await is legal in class static blocks since ES2022).
 */
export function isAwaitLegalInStaticBlock(_node: AstNode): boolean {
  return false; // Conservative — TS spec says no.
}
