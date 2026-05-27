/**
 * RegExp literal type handling.
 *
 * Ported from Strada `checker.go` — checkRegularExpressionLiteral,
 * getRegExpType, validateRegexFlags.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is a RegularExpressionLiteral.
 */
export function isRegExpLiteral(node: AstNode): boolean {
  return node.kind === Kind.RegularExpressionLiteral;
}

/**
 * Returns the raw text of a RegExp literal (`/foo/i`).
 */
export function getRegExpLiteralText(node: AstNode): string | undefined {
  if (!isRegExpLiteral(node)) return undefined;
  return (node as unknown as { text?: string }).text;
}

/**
 * Returns the canonical RegExp type for a literal.
 */
export function getRegExpType(): Type {
  return {
    flags: TypeFlags.Object,
    symbol: { name: "RegExp" },
  } as unknown as Type;
}

/**
 * Returns the flag set of a RegExp literal text. Flags are the
 * single-character qualifiers after the closing `/`.
 */
export function getRegExpFlags(text: string): string {
  const lastSlash = text.lastIndexOf("/");
  if (lastSlash === -1 || lastSlash === text.length - 1) return "";
  return text.slice(lastSlash + 1);
}

/**
 * Returns the pattern body of a RegExp literal text (between the
 * delimiting slashes).
 */
export function getRegExpPattern(text: string): string {
  const lastSlash = text.lastIndexOf("/");
  if (lastSlash <= 0) return "";
  return text.slice(1, lastSlash);
}

/**
 * Returns true when a flag character is valid.
 */
export function isValidRegExpFlag(flag: string): boolean {
  return "gimsuyvd".includes(flag);
}

/**
 * Returns true when all flag characters in a flag string are valid.
 */
export function areValidRegExpFlags(flags: string): boolean {
  for (let i = 0; i < flags.length; i++) {
    if (!isValidRegExpFlag(flags[i]!)) return false;
  }
  return true;
}

/**
 * Returns true when a flag appears more than once (an error).
 */
export function hasDuplicateRegExpFlag(flags: string): boolean {
  const seen = new Set<string>();
  for (let i = 0; i < flags.length; i++) {
    const f = flags[i]!;
    if (seen.has(f)) return true;
    seen.add(f);
  }
  return false;
}
