/**
 * Template-literal type resolution.
 *
 * Ported from Strada `checker.go` — getTemplateLiteralType,
 * resolveTemplateLiteralType, isPatternLiteralType.
 *
 * A template-literal type alternates literal text segments with
 * type expressions: `` `Hello ${World}` ``.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;

/**
 * Returns true when the node is a TemplateLiteralType node.
 */
export function isTemplateLiteralTypeNode(node: AstNode): boolean {
  return node.kind === Kind.TemplateLiteralType;
}

/**
 * Returns the head literal (text before the first interpolation) of a
 * TemplateLiteralType node.
 */
export function getTemplateLiteralTypeHead(node: AstNode): string {
  const head = (node as unknown as { head?: AstNode }).head;
  if (head === undefined) return "";
  return (head as unknown as { text?: string }).text ?? "";
}

/**
 * Returns the type spans of a TemplateLiteralType node — each span
 * carries an inner type and a trailing literal segment.
 */
export function getTemplateLiteralTypeSpans(node: AstNode): readonly AstNode[] {
  const spans = (node as unknown as { templateSpans?: readonly AstNode[] }).templateSpans;
  return spans ?? [];
}

/**
 * Returns the inner type-node of a TemplateLiteralTypeSpan.
 */
export function getTemplateLiteralSpanType(span: AstNode): AstNode | undefined {
  return (span as unknown as { type?: AstNode }).type;
}

/**
 * Returns the literal tail text of a TemplateLiteralTypeSpan (the
 * fixed text after this span's interpolation).
 */
export function getTemplateLiteralSpanText(span: AstNode): string {
  const tail = (span as unknown as { literal?: AstNode }).literal;
  if (tail === undefined) return "";
  return (tail as unknown as { text?: string }).text ?? "";
}

/**
 * Concatenates two literal strings into one. Returns the joined value
 * when both inputs are literal types; otherwise returns the canonical
 * `string` type as the conservative fallback.
 */
export function concatTemplateLiteralTypes(left: Type, right: Type): Type {
  const lf = (left as { flags?: number }).flags ?? 0;
  const rf = (right as { flags?: number }).flags ?? 0;
  if ((lf & TypeFlags.StringLiteral) !== 0 && (rf & TypeFlags.StringLiteral) !== 0) {
    const lv = (left as unknown as { value?: string }).value ?? "";
    const rv = (right as unknown as { value?: string }).value ?? "";
    return { flags: TypeFlags.StringLiteral, value: lv + rv } as unknown as Type;
  }
  return STRING;
}

/**
 * Builds a template-literal type from a head + spans + tail list.
 * Conservative: returns the `string` primitive when any span's type
 * is not a literal.
 */
export function buildTemplateLiteralType(
  head: string,
  spanTypes: readonly Type[],
  spanTails: readonly string[],
): Type {
  let acc: Type = { flags: TypeFlags.StringLiteral, value: head } as unknown as Type;
  for (let i = 0; i < spanTypes.length; i++) {
    acc = concatTemplateLiteralTypes(acc, spanTypes[i]!);
    const tail: Type = {
      flags: TypeFlags.StringLiteral,
      value: spanTails[i] ?? "",
    } as unknown as Type;
    acc = concatTemplateLiteralTypes(acc, tail);
  }
  return acc;
}

/**
 * Returns true when the type is a pattern literal — its set is
 * countable / regex-matchable but not a single concrete string.
 */
export function isPatternLiteralType(t: Type): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  // Template literal types use the same flag namespace as Object —
  // surface a placeholder predicate that returns false for now.
  return (flags & TypeFlags.Object) !== 0 &&
    (t as unknown as { isTemplateLiteral?: boolean }).isTemplateLiteral === true;
}
