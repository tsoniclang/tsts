/**
 * Module-augmentation handling.
 *
 * Ported from Strada `checker.go` — collectModuleAugmentations,
 * mergeAugmentationsIntoSymbol.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a module-augmentation declaration —
 * `declare module "x" { ... }` inside an external module.
 */
export function isModuleAugmentation(node: AstNode): boolean {
  if (node.kind !== Kind.ModuleDeclaration) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined) return false;
  if (name.kind !== Kind.StringLiteral) return false;
  // The enclosing source file must be a module for this to qualify.
  return true;
}

/**
 * Returns the module specifier text of an augmentation.
 */
export function getAugmentationModuleSpecifier(node: AstNode): string | undefined {
  if (!isModuleAugmentation(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.StringLiteral) return undefined;
  return (name as unknown as { text?: string }).text;
}

/**
 * Returns true when the node is a "global augmentation" —
 * `declare global { ... }`.
 */
export function isGlobalAugmentation(node: AstNode): boolean {
  if (node.kind !== Kind.ModuleDeclaration) return false;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return false;
  return (name as unknown as { escapedText?: string }).escapedText === "global";
}

/**
 * Returns the body of an augmentation.
 */
export function getAugmentationBody(node: AstNode): AstNode | undefined {
  if (node.kind !== Kind.ModuleDeclaration) return undefined;
  return (node as unknown as { body?: AstNode }).body;
}

/**
 * Returns the statements inside an augmentation body.
 */
export function getAugmentationStatements(node: AstNode): readonly AstNode[] {
  const body = getAugmentationBody(node);
  if (body === undefined) return [];
  if (body.kind !== Kind.ModuleBlock) return [];
  const statements = (body as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements;
  return statements?.nodes ?? [];
}

/**
 * Returns true when an augmentation only contains type-level
 * declarations (no value-level emit).
 */
export function isTypeOnlyAugmentation(node: AstNode): boolean {
  const stmts = getAugmentationStatements(node);
  return stmts.every((s) =>
    s.kind === Kind.InterfaceDeclaration ||
    s.kind === Kind.TypeAliasDeclaration,
  );
}
