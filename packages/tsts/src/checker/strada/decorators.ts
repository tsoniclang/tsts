/**
 * Decorator validation.
 *
 * Ported from Strada `checker.go` — checkDecorator,
 * checkClassDecorator, validateDecoratorTarget.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Valid decorator targets in TC39 / TS.
 */
export const DecoratorTargetKinds = new Set<number>([
  Kind.ClassDeclaration,
  Kind.ClassExpression,
  Kind.MethodDeclaration,
  Kind.GetAccessor,
  Kind.SetAccessor,
  Kind.PropertyDeclaration,
  Kind.Parameter,
]);

export function isValidDecoratorTarget(node: AstNode): boolean {
  return DecoratorTargetKinds.has((node as { kind?: number }).kind ?? -1);
}

/**
 * Returns true when the decorator's expression is a call expression
 * (e.g. `@foo()` vs `@foo`).
 */
export function isDecoratorCall(node: AstNode): boolean {
  const expr = (node as unknown as { expression?: { kind?: number } }).expression;
  return expr?.kind === Kind.CallExpression;
}

/**
 * Walks the modifiers of a declaration returning only the decorator
 * nodes (skipping the keyword modifiers).
 */
export function getOwnDecorators(node: AstNode): readonly AstNode[] {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return [];
  return mods.filter((m) => (m as { kind?: number }).kind === Kind.Decorator);
}

export function hasDecorator(node: AstNode): boolean {
  return getOwnDecorators(node).length > 0;
}

/**
 * Returns true when this decorator is the legacy (Reflect-metadata)
 * shape. We can't distinguish at the AST level — caller must consult
 * compiler options.
 */
export function isLegacyDecorator(_node: AstNode, experimentalDecorators: boolean): boolean {
  return experimentalDecorators;
}

/**
 * Returns true when the decorator is a TC39 / TS 5.0 decorator (the
 * non-experimental kind).
 */
export function isStandardDecorator(node: AstNode, experimentalDecorators: boolean): boolean {
  return !isLegacyDecorator(node, experimentalDecorators);
}

/**
 * Validates that the decorator's containing class is not a namespace
 * member when experimentalDecorators is off (modern TS rule).
 */
export function validateDecoratorEnclosure(node: AstNode, experimentalDecorators: boolean): boolean {
  if (experimentalDecorators) return true;
  // Walk up to the enclosing class. If we hit a namespace before the
  // class, the standard decorator rules don't apply.
  let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    if (k === Kind.ClassDeclaration || k === Kind.ClassExpression) return true;
    if (k === Kind.ModuleDeclaration) return false;
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return false;
}

/**
 * Returns true when the decorated node sits in an export position
 * (top-level or class member with `export` modifier).
 */
export function isInExportPosition(node: AstNode): boolean {
  let n: AstNode | undefined = (node as unknown as { parent?: AstNode }).parent;
  while (n !== undefined) {
    const k = (n as { kind?: number }).kind;
    if (k === Kind.SourceFile) return true;
    if (k === Kind.ExportAssignment || k === Kind.ExportDeclaration) return true;
    n = (n as unknown as { parent?: AstNode }).parent;
  }
  return false;
}
