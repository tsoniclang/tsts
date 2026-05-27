/**
 * `"use strict"` directive detection.
 *
 * Ported from Strada `checker.go` — checkUseStrictDirective,
 * isUseStrictPrologue, hasStrictModeBody.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a "use strict" prologue directive.
 */
export function isUseStrictPrologue(node: AstNode): boolean {
  if (node.kind !== Kind.ExpressionStatement) return false;
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr === undefined) return false;
  if (expr.kind !== Kind.StringLiteral) return false;
  const text = (expr as unknown as { text?: string }).text;
  return text === "use strict";
}

/**
 * Returns the prologue directives at the top of a Block or
 * SourceFile.
 */
export function getPrologueDirectives(body: AstNode): readonly AstNode[] {
  const statements = (body as unknown as { statements?: { nodes?: readonly AstNode[] } }).statements?.nodes;
  if (statements === undefined) return [];
  const ref: { out: AstNode[]; done: boolean } = { out: [], done: false };
  for (const s of statements) {
    if (ref.done) break;
    if (s.kind !== Kind.ExpressionStatement) {
      ref.done = true;
      break;
    }
    const expr = (s as unknown as { expression?: AstNode }).expression;
    if (expr === undefined || expr.kind !== Kind.StringLiteral) {
      ref.done = true;
      break;
    }
    ref.out.push(s);
  }
  return ref.out;
}

/**
 * Returns true when a function body starts with a `"use strict"`
 * directive.
 */
export function hasUseStrictDirective(body: AstNode): boolean {
  return getPrologueDirectives(body).some(isUseStrictPrologue);
}

/**
 * Returns true when the source file is implicitly strict — modules
 * (ESM source files) are always strict.
 */
export function isImplicitlyStrict(sourceFile: AstNode): boolean {
  if (sourceFile.kind !== Kind.SourceFile) return false;
  return (sourceFile as unknown as { isExternalModule?: boolean }).isExternalModule === true;
}

/**
 * Returns true when the node is in a strict-mode context — either
 * inside a strict function/module, or has an explicit prologue.
 */
export function isInStrictMode(node: AstNode): boolean {
  let current: AstNode | undefined = node;
  while (current !== undefined) {
    if (current.kind === Kind.SourceFile) {
      return isImplicitlyStrict(current);
    }
    if (
      current.kind === Kind.FunctionDeclaration ||
      current.kind === Kind.FunctionExpression ||
      current.kind === Kind.ArrowFunction ||
      current.kind === Kind.MethodDeclaration
    ) {
      const body = (current as unknown as { body?: AstNode }).body;
      if (body !== undefined && hasUseStrictDirective(body)) return true;
    }
    current = (current as unknown as { parent?: AstNode }).parent;
  }
  return false;
}
