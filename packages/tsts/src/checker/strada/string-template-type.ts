/**
 * Template-literal type construction (`` `${T}` ``).
 *
 * Ported from Strada `checker.go` — getTemplateLiteralType,
 * getTemplateLiteralResultType.
 *
 * Distinct from `template-expressions.ts` which handles runtime
 * template-strings; this module handles the type-level form.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const STRING: Type = { flags: TypeFlags.String } as unknown as Type;

/**
 * Returns true when the type is a template-literal type.
 */
export function isTemplateLiteralType(t: Type): boolean {
  return (t as unknown as { isTemplateLiteral?: boolean }).isTemplateLiteral === true;
}

/**
 * Returns the static "head" prefix of a template-literal type.
 */
export function getTemplateHead(t: Type): string | undefined {
  return (t as unknown as { head?: string }).head;
}

/**
 * Returns the embedded type arguments of a template-literal type.
 */
export function getTemplateTypes(t: Type): readonly Type[] {
  return (t as unknown as { types?: readonly Type[] }).types ?? [];
}

/**
 * Returns the static "tails" — text between/after the embedded types.
 */
export function getTemplateTexts(t: Type): readonly string[] {
  return (t as unknown as { texts?: readonly string[] }).texts ?? [];
}

/**
 * Builds a template-literal type from head + alternating type/text
 * segments.
 */
export function createTemplateLiteralType(
  head: string,
  types: readonly Type[],
  texts: readonly string[],
): Type {
  return {
    flags: TypeFlags.Object,
    isTemplateLiteral: true,
    head,
    types,
    texts,
  } as unknown as Type;
}

/**
 * Returns the canonical primitive (`string`) when the template is
 * effectively unbounded — at least one type argument is non-literal.
 */
export function widenToStringIfNeeded(t: Type): Type {
  if (!isTemplateLiteralType(t)) return t;
  const types = getTemplateTypes(t);
  const allLiteral = types.every((s) => {
    const flags = (s as { flags?: number }).flags ?? 0;
    return (flags & TypeFlags.Literal) !== 0;
  });
  if (allLiteral) return t;
  return STRING;
}

/**
 * Returns the count of embedded type arguments.
 */
export function getTemplatePartCount(t: Type): number {
  return getTemplateTypes(t).length;
}

/**
 * Returns true when the template is empty (`` `` ``) — both head
 * and types are empty.
 */
export function isEmptyTemplate(t: Type): boolean {
  if (!isTemplateLiteralType(t)) return false;
  return getTemplateHead(t) === "" && getTemplateTypes(t).length === 0;
}
