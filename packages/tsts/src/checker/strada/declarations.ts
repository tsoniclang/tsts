/**
 * Declaration-level check functions.
 *
 * Ported from Strada `checker.go` — checkClassDeclaration et al.
 * Walks per-declaration sub-elements and forwards.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, SourceFile } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

const OBJECT: Type = { flags: 1 << 19 } as unknown as Type;

export function checkClassDeclaration(c: CheckerOps, node: AstNode): void {
  checkClassLikeDeclaration(c, node);
}

export function checkClassExpression(c: CheckerOps, node: AstNode): Type {
  checkClassLikeDeclaration(c, node);
  return OBJECT;
}

export function checkClassExpressionDeferred(c: CheckerOps, node: AstNode): void {
  checkClassLikeDeclaration(c, node);
}

export function checkClassLikeDeclaration(c: CheckerOps, node: AstNode): void {
  // Visit heritage clauses + each member.
  const heritage = (node as unknown as { heritageClauses?: { nodes?: readonly AstNode[] } }).heritageClauses?.nodes;
  if (heritage !== undefined) {
    for (const clause of heritage) {
      const types = (clause as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
      if (types !== undefined) for (const t of types) {
        const e = (t as unknown as { expression?: AstNode }).expression;
        if (e !== undefined) c.checkExpression(e);
      }
    }
  }
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  if (members === undefined) return;
  for (const m of members) {
    const k = (m as { kind?: number }).kind;
    if (k === Kind.MethodDeclaration) c.checkMethodDeclaration(m);
    else if (k === Kind.PropertyDeclaration) c.checkPropertyDeclaration(m);
    else if (k === Kind.Constructor) c.checkConstructorDeclaration(m);
    else if (k === Kind.GetAccessor || k === Kind.SetAccessor) c.checkAccessorDeclaration(m);
    else if (k === Kind.ClassStaticBlockDeclaration) c.checkClassStaticBlockDeclaration(m);
  }
}

export function checkClassStaticBlockDeclaration(c: CheckerOps, node: AstNode): void {
  const body = (node as unknown as { body?: AstNode }).body;
  if (body !== undefined) c.checkSourceElement(body);
}

export function checkInterfaceDeclaration(_c: CheckerOps, _node: AstNode): void {
  // Type-only — no runtime sub-expression to visit.
}

export function checkTypeAliasDeclaration(_c: CheckerOps, _node: AstNode): void {
  // Type-only.
}

export function checkEnumDeclaration(c: CheckerOps, node: AstNode): void {
  const members = (node as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  if (members === undefined) return;
  for (const m of members) c.checkEnumMember(m);
}

export function checkEnumMember(c: CheckerOps, node: AstNode): void {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) c.checkExpression(init);
}

export function checkModuleDeclaration(c: CheckerOps, node: AstNode): void {
  const body = (node as unknown as { body?: AstNode }).body;
  if (body !== undefined) c.checkSourceElement(body);
}

export function checkConstructorDeclaration(c: CheckerOps, node: AstNode): void {
  const params = (node as unknown as { parameters?: { nodes?: readonly AstNode[] } }).parameters?.nodes;
  if (params !== undefined) for (const p of params) c.checkParameter(p);
  const body = (node as unknown as { body?: AstNode }).body;
  if (body !== undefined) c.checkSourceElement(body);
}

export function checkMethodDeclaration(c: CheckerOps, node: AstNode): void {
  checkConstructorDeclaration(c, node);
}

export function checkAccessorDeclaration(c: CheckerOps, node: AstNode): void {
  checkConstructorDeclaration(c, node);
}

export function checkPropertyDeclaration(c: CheckerOps, node: AstNode): void {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) c.checkExpression(init);
}

export function checkFunctionDeclaration(c: CheckerOps, node: AstNode): void {
  checkConstructorDeclaration(c, node);
}

export function checkVariableDeclaration(c: CheckerOps, node: AstNode): void {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) c.checkExpression(init);
}

export function checkVariableDeclarationList(c: CheckerOps, node: AstNode): void {
  const decls = (node as unknown as { declarations?: { nodes?: readonly AstNode[] } }).declarations?.nodes;
  if (decls !== undefined) for (const d of decls) checkVariableDeclaration(c, d);
}

export function checkParameter(c: CheckerOps, node: AstNode): void {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) c.checkExpression(init);
}

export function checkBindingElement(c: CheckerOps, node: AstNode): void {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) c.checkExpression(init);
}

export function checkImportDeclaration(_c: CheckerOps, _node: AstNode): void {
  // Type-only; nothing to visit.
}

export function checkExportDeclaration(_c: CheckerOps, _node: AstNode): void {
  // No runtime expressions to visit; specifiers are handled by checker resolution.
}

export function checkExportAssignment(c: CheckerOps, node: AstNode): void {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) c.checkExpression(expr);
}

export function checkExportSpecifier(_c: CheckerOps, _node: AstNode): void {
  // Resolved during symbol resolution.
}

export function checkExternalImportOrExportDeclaration(_c: CheckerOps, _node: AstNode): boolean {
  return true;
}

export function checkExternalModuleExports(_c: CheckerOps, _file: SourceFile): void {
  // Resolved during exports resolution.
}
