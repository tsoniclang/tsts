/**
 * Enum-member value resolution.
 *
 * Ported from Strada `checker.go` — getEnumMemberValue,
 * computeEnumMemberValues, isConstEnumMember.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import { evaluate } from "./expression-evaluation.js";

/**
 * Returns true when the node is an EnumMember.
 */
export function isEnumMember(node: AstNode): boolean {
  return node.kind === Kind.EnumMember;
}

/**
 * Returns the initializer of an enum member, if any.
 */
export function getEnumMemberInitializer(node: AstNode): AstNode | undefined {
  if (!isEnumMember(node)) return undefined;
  return (node as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns the explicit value of an enum member, if it has a
 * statically-evaluable initializer.
 */
export function getExplicitEnumMemberValue(node: AstNode): number | string | undefined {
  const init = getEnumMemberInitializer(node);
  if (init === undefined) return undefined;
  const value = evaluate(init);
  if (typeof value === "number" || typeof value === "string") return value;
  return undefined;
}

/**
 * Returns true when the enum member is auto-incremented (no
 * initializer).
 */
export function isAutoIncrementMember(node: AstNode): boolean {
  return isEnumMember(node) && getEnumMemberInitializer(node) === undefined;
}

/**
 * Computes the values of all enum members, auto-incrementing
 * where no initializer is present.
 */
export function computeEnumMemberValues(
  members: readonly AstNode[],
): readonly (number | string | undefined)[] {
  const out: (number | string | undefined)[] = [];
  const ref: { autoValue: number } = { autoValue: 0 };
  for (const m of members) {
    const explicit = getExplicitEnumMemberValue(m);
    if (explicit !== undefined) {
      out.push(explicit);
      if (typeof explicit === "number") {
        ref.autoValue = explicit + 1;
      }
    } else {
      out.push(ref.autoValue);
      ref.autoValue++;
    }
  }
  return out;
}

/**
 * Returns the enum member name text.
 */
export function getEnumMemberName(node: AstNode): string | undefined {
  if (!isEnumMember(node)) return undefined;
  const name = (node as unknown as { name?: AstNode }).name;
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier) {
    return (name as unknown as { escapedText?: string }).escapedText;
  }
  if (name.kind === Kind.StringLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Returns true when an enum member has a string value.
 */
export function isStringValuedMember(node: AstNode): boolean {
  return typeof getExplicitEnumMemberValue(node) === "string";
}
