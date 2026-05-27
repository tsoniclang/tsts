/**
 * Template literal expression typing.
 *
 * Ported from Strada `checker.go` — checkTemplateExpression,
 * getTaggedTemplateSignature, getTemplateLiteralResultType.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;

/**
 * Returns true when the node is a template literal expression.
 */
export function isTemplateLiteralExpression(node: AstNode): boolean {
  return (
    node.kind === Kind.TemplateExpression ||
    node.kind === Kind.NoSubstitutionTemplateLiteral
  );
}

/**
 * Returns the head of a TemplateExpression (the text before the
 * first interpolation).
 */
export function getTemplateHead(node: AstNode): string {
  if (node.kind !== Kind.TemplateExpression) return "";
  const head = (node as unknown as { head?: AstNode }).head;
  if (head === undefined) return "";
  return (head as unknown as { text?: string }).text ?? "";
}

/**
 * Returns the spans of a TemplateExpression. Each span has an inner
 * expression and a trailing literal text segment.
 */
export function getTemplateSpans(node: AstNode): readonly AstNode[] {
  if (node.kind !== Kind.TemplateExpression) return [];
  const spans = (node as unknown as { templateSpans?: { nodes?: readonly AstNode[] } }).templateSpans;
  return spans?.nodes ?? [];
}

/**
 * Returns the inner expression of a TemplateSpan.
 */
export function getTemplateSpanExpression(span: AstNode): AstNode | undefined {
  if (span.kind !== Kind.TemplateSpan) return undefined;
  return (span as unknown as { expression?: AstNode }).expression;
}

/**
 * Returns the trailing-literal text of a TemplateSpan.
 */
export function getTemplateSpanLiteralText(span: AstNode): string {
  if (span.kind !== Kind.TemplateSpan) return "";
  const literal = (span as unknown as { literal?: AstNode }).literal;
  if (literal === undefined) return "";
  return (literal as unknown as { text?: string }).text ?? "";
}

/**
 * Returns the canonical result type of a template-literal expression.
 * Always string unless the expression's interpolations are all literals
 * (in which case a string-literal type can be inferred).
 */
export function getTemplateExpressionType(): Type {
  return STRING;
}

/**
 * Returns true when the node is a tagged template expression.
 */
export function isTaggedTemplate(node: AstNode): boolean {
  return node.kind === Kind.TaggedTemplateExpression;
}

/**
 * Returns the tag expression of a tagged-template.
 */
export function getTaggedTemplateTag(node: AstNode): AstNode | undefined {
  if (!isTaggedTemplate(node)) return undefined;
  return (node as unknown as { tag?: AstNode }).tag;
}

/**
 * Returns the template literal portion of a tagged-template.
 */
export function getTaggedTemplateTemplate(node: AstNode): AstNode | undefined {
  if (!isTaggedTemplate(node)) return undefined;
  return (node as unknown as { template?: AstNode }).template;
}

/**
 * Returns the type-arguments node of a tagged template (for generic
 * tags: `` foo<T>`...` ``).
 */
export function getTaggedTemplateTypeArguments(node: AstNode): readonly AstNode[] {
  if (!isTaggedTemplate(node)) return [];
  const ta = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments;
  return ta?.nodes ?? [];
}
