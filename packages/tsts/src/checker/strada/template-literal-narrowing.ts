/**
 * Template-literal type narrowing.
 *
 * Ported from Strada `checker.go` — narrowByTemplateLiteralPrefix,
 * matchesTemplatePattern.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";
function getStringValue(t: Type): string | undefined {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) === 0) return undefined;
  return (t as unknown as { value?: string }).value;
}

/**
 * Returns true when a string-literal type matches a template
 * literal's static-prefix pattern.
 */
export function matchesTemplateLiteralPrefix(t: Type, prefix: string): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) === 0) return false;
  const value = getStringValue(t);
  if (value === undefined) return false;
  return value.startsWith(prefix);
}

/**
 * Returns true when a string-literal type matches a template
 * literal's static-suffix pattern.
 */
export function matchesTemplateLiteralSuffix(t: Type, suffix: string): boolean {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.StringLiteral) === 0) return false;
  const value = getStringValue(t);
  if (value === undefined) return false;
  return value.endsWith(suffix);
}

/**
 * Returns true when a string-literal type matches a template-literal
 * pattern with both prefix and suffix.
 */
export function matchesTemplatePrefixAndSuffix(
  t: Type,
  prefix: string,
  suffix: string,
): boolean {
  return matchesTemplateLiteralPrefix(t, prefix) &&
    matchesTemplateLiteralSuffix(t, suffix);
}

/**
 * Returns the "infer middle" — the substring of a literal value
 * between a prefix and suffix.
 */
export function extractMiddleFromTemplate(
  t: Type,
  prefix: string,
  suffix: string,
): string | undefined {
  if (!matchesTemplatePrefixAndSuffix(t, prefix, suffix)) return undefined;
  const value = getStringValue(t);
  if (value === undefined) return undefined;
  return value.slice(prefix.length, value.length - suffix.length);
}

/**
 * Narrows a string union to constituents matching a template
 * literal pattern.
 */
export function narrowByTemplateLiteralPattern(
  t: Type,
  prefix: string,
  suffix: string,
): readonly Type[] {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    return matchesTemplatePrefixAndSuffix(t, prefix, suffix) ? [t] : [];
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return types.filter((c) => matchesTemplatePrefixAndSuffix(c, prefix, suffix));
}
