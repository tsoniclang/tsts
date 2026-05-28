/**
 * TemplateLiteralType node handling (`` `prefix${T}suffix` ``).
 *
 * Ported from Strada `checker.go` — getTypeFromTemplateLiteralTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a TemplateLiteralType.
 */
export function isTemplateLiteralTypeNode(node: AstNode): boolean {
  return node.kind === Kind.TemplateLiteralType;
}

/**
 * Returns the head text of a TemplateLiteralType.
 */
export function getTemplateLiteralTypeHead(node: AstNode): string {
  if (!isTemplateLiteralTypeNode(node)) return "";
  const head = (node as unknown as { head?: AstNode }).head;
  if (head === undefined) return "";
  return (head as unknown as { text?: string }).text ?? "";
}

/**
 * Returns the template spans of a TemplateLiteralType.
 */
export function getTemplateLiteralTypeSpans(node: AstNode): readonly AstNode[] {
  if (!isTemplateLiteralTypeNode(node)) return [];
  const spans = (node as unknown as { templateSpans?: { nodes?: readonly AstNode[] } }).templateSpans;
  return spans?.nodes ?? [];
}

/**
 * Returns true when the node is a TemplateLiteralTypeSpan.
 */
export function isTemplateLiteralTypeSpan(node: AstNode): boolean {
  return node.kind === Kind.TemplateLiteralTypeSpan;
}

/**
 * Returns the embedded type-node of a TemplateLiteralTypeSpan.
 */
export function getTemplateSpanType(span: AstNode): AstNode | undefined {
  if (!isTemplateLiteralTypeSpan(span)) return undefined;
  return (span as unknown as { type?: AstNode }).type;
}

/**
 * Returns the trailing-literal text of a TemplateLiteralTypeSpan.
 */
export function getTemplateSpanLiteralText(span: AstNode): string {
  if (!isTemplateLiteralTypeSpan(span)) return "";
  const literal = (span as unknown as { literal?: AstNode }).literal;
  if (literal === undefined) return "";
  return (literal as unknown as { text?: string }).text ?? "";
}

/**
 * Returns the span count.
 */
export function getTemplateSpanCount(node: AstNode): number {
  return getTemplateLiteralTypeSpans(node).length;
}

/**
 * Returns true when the template literal type is "static" — all its
 * spans embed literal types.
 */
export function isStaticTemplateLiteralType(node: AstNode): boolean {
  const spans = getTemplateLiteralTypeSpans(node);
  return spans.every((span) => {
    const t = getTemplateSpanType(span);
    return t !== undefined && t.kind === Kind.LiteralType;
  });
}

/**
 * Returns the embedded type-nodes of all spans.
 */
export function getAllSpanTypes(node: AstNode): readonly AstNode[] {
  const out: AstNode[] = [];
  for (const span of getTemplateLiteralTypeSpans(node)) {
    const t = getTemplateSpanType(span);
    if (t !== undefined) out.push(t);
  }
  return out;
}
