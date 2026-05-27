/**
 * JSX-specific check functions.
 *
 * Ported from Strada `checker/jsx.go` — checkJsxElement, attribute
 * lookups, intrinsic-tag classification.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

const OBJECT: Type = { flags: 1 << 19 } as unknown as Type;
const ANY: Type = { flags: 1 << 0 } as unknown as Type;

export function checkJsxElement(c: CheckerOps, node: AstNode): Type {
  // Visit opening element + children + closing.
  const opening = (node as unknown as { openingElement?: AstNode }).openingElement;
  if (opening !== undefined) checkJsxOpeningLikeElement(c, opening);
  const children = (node as unknown as { children?: { nodes?: readonly AstNode[] } }).children?.nodes;
  if (children !== undefined) for (const child of children) c.checkSourceElement(child);
  return OBJECT;
}

export function checkJsxSelfClosingElement(c: CheckerOps, node: AstNode): Type {
  checkJsxOpeningLikeElement(c, node);
  return OBJECT;
}

export function checkJsxFragment(c: CheckerOps, node: AstNode): Type {
  const children = (node as unknown as { children?: { nodes?: readonly AstNode[] } }).children?.nodes;
  if (children !== undefined) for (const child of children) c.checkSourceElement(child);
  return OBJECT;
}

export function checkJsxOpeningLikeElement(c: CheckerOps, node: AstNode): void {
  // Walk the attributes; each attribute's initializer is type-checked.
  const tagName = (node as unknown as { tagName?: AstNode }).tagName;
  if (tagName !== undefined) c.checkExpression(tagName);
  const attrs = (node as unknown as { attributes?: AstNode }).attributes;
  if (attrs !== undefined) checkJsxAttributes(c, attrs);
}

export function checkJsxAttributes(c: CheckerOps, node: AstNode): Type {
  const properties = (node as unknown as { properties?: { nodes?: readonly AstNode[] } }).properties?.nodes;
  if (properties === undefined) return OBJECT;
  for (const prop of properties) {
    const k = (prop as { kind?: number }).kind;
    if (k === Kind.JsxAttribute) checkJsxAttribute(c, prop);
    else if (k === Kind.JsxSpreadAttribute) {
      const expr = (prop as unknown as { expression?: AstNode }).expression;
      if (expr !== undefined) c.checkExpression(expr);
    }
  }
  return OBJECT;
}

export function checkJsxAttribute(c: CheckerOps, node: AstNode): Type {
  const init = (node as unknown as { initializer?: AstNode }).initializer;
  if (init !== undefined) {
    const initKind = (init as { kind?: number }).kind;
    if (initKind === Kind.JsxExpression) {
      const innerExpr = (init as unknown as { expression?: AstNode }).expression;
      if (innerExpr !== undefined) c.checkExpression(innerExpr);
    } else {
      c.checkExpression(init);
    }
  }
  return ANY;
}

export function checkJsxExpression(c: CheckerOps, node: AstNode): Type {
  const expr = (node as unknown as { expression?: AstNode }).expression;
  if (expr !== undefined) return c.checkExpression(expr);
  return ANY;
}

export function isJsxIntrinsicTagName(tagName: AstNode): boolean {
  // An intrinsic tag is an Identifier whose first char is lowercase.
  const k = (tagName as { kind?: number }).kind;
  if (k !== Kind.Identifier) return false;
  const text = (tagName as unknown as { text?: string }).text ?? "";
  if (text.length === 0) return false;
  const c = text.charCodeAt(0);
  return c >= 0x61 /* a */ && c <= 0x7a /* z */;
}

export function getJsxElementChildrenPropertyName(): string {
  return "children";
}

export function getJsxElementPropertiesName(): string {
  return "props";
}

export function isUnhyphenatedJsxName(name: string): boolean {
  return !name.includes("-");
}
