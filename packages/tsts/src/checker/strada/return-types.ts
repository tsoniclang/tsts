/**
 * Return-type inference and explicit-annotation resolution.
 *
 * Ported from Strada `checker.go` — getReturnTypeOfSignature
 * (annotation-side), getReturnTypeFromBody, computeReturnTypeFromAllReturnStatements.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const VOID: Type = { flags: TypeFlags.Void } as unknown as Type;
const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;
const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns the explicit return-type annotation of a function-like
 * declaration, or undefined when none is present.
 */
export function getReturnTypeAnnotation(decl: AstNode): AstNode | undefined {
  return (decl as unknown as { type?: AstNode }).type;
}

/**
 * Returns the body of a function-like declaration, or undefined
 * for an arrow without a block body / signature-only declaration.
 */
export function getFunctionBody(decl: AstNode): AstNode | undefined {
  return (decl as unknown as { body?: AstNode }).body;
}

/**
 * Returns the union of all return-expression types for a function
 * body. Conservative placeholder until the inference pass is wired.
 */
export function collectReturnExpressions(body: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  walk(body, out);
  return out;
}

function walk(node: AstNode, out: AstNode[]): void {
  if (node.kind === Kind.ReturnStatement) {
    const expr = (node as unknown as { expression?: AstNode }).expression;
    if (expr !== undefined) out.push(expr);
    return;
  }
  // Don't descend into nested function bodies.
  if (
    node.kind === Kind.FunctionDeclaration ||
    node.kind === Kind.FunctionExpression ||
    node.kind === Kind.ArrowFunction ||
    node.kind === Kind.MethodDeclaration
  ) {
    return;
  }
  const children = (node as unknown as { children?: () => readonly AstNode[] }).children;
  if (typeof children === "function") {
    for (const c of children.call(node)) walk(c, out);
  }
}

/**
 * Returns the conservative return type for a function-like with no
 * explicit annotation and no body — used in declaration-emit and
 * isolatedDeclarations modes.
 */
export function getConservativeReturnTypeForSignature(decl: AstNode): Type {
  const annot = getReturnTypeAnnotation(decl);
  if (annot !== undefined) return ANY;
  const body = getFunctionBody(decl);
  if (body === undefined) return VOID;
  return ANY;
}

/**
 * Returns true when the function body completes normally — i.e.
 * does not unconditionally throw or recurse. Used to decide whether
 * `never` is the inferred return type.
 */
export function bodyCompletesNormally(body: AstNode | undefined): boolean {
  if (body === undefined) return false;
  // Conservative: assume yes. The flow.ts module handles the
  // never-return analysis when fully ported.
  return true;
}

/**
 * Returns Never when the body never completes (always throws or
 * recurses); otherwise returns Any as the conservative inferred type.
 */
export function inferReturnTypeFromBody(body: AstNode | undefined): Type {
  if (body === undefined) return ANY;
  if (!bodyCompletesNormally(body)) return NEVER;
  return ANY;
}
