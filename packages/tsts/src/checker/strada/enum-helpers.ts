/**
 * Enum-declaration helpers (separate from the constant-folding pass
 * in `enums.ts`).
 *
 * Ported from Strada `checker.go` — getEnumMemberSymbols,
 * isStringEnum, isNumericEnum, getEnumKind.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

export const EnumKind = {
  Numeric: 0,
  String: 1,
  Heterogeneous: 2,
  Empty: 3,
} as const;

export type EnumKind =
  | typeof EnumKind.Numeric
  | typeof EnumKind.String
  | typeof EnumKind.Heterogeneous
  | typeof EnumKind.Empty;

/**
 * Returns the member declarations of an EnumDeclaration node.
 */
export function getEnumMembers(decl: AstNode): readonly AstNode[] {
  if (decl.kind !== Kind.EnumDeclaration) return [];
  const members = (decl as unknown as { members?: { nodes?: readonly AstNode[] } }).members;
  return members?.nodes ?? [];
}

/**
 * Returns the kind of an enum based on its member initializers.
 */
export function getEnumKind(decl: AstNode): EnumKind {
  const members = getEnumMembers(decl);
  if (members.length === 0) return EnumKind.Empty;
  let hasString = false;
  let hasNumeric = false;
  for (const m of members) {
    const init = (m as unknown as { initializer?: AstNode }).initializer;
    if (init === undefined) {
      hasNumeric = true;
      continue;
    }
    if (init.kind === Kind.StringLiteral || init.kind === Kind.NoSubstitutionTemplateLiteral) {
      hasString = true;
    } else {
      hasNumeric = true;
    }
  }
  if (hasString && hasNumeric) return EnumKind.Heterogeneous;
  if (hasString) return EnumKind.String;
  return EnumKind.Numeric;
}

/**
 * Returns true when the enum is purely string-valued.
 */
export function isStringEnum(decl: AstNode): boolean {
  return getEnumKind(decl) === EnumKind.String;
}

/**
 * Returns true when the enum is purely numeric.
 */
export function isNumericEnum(decl: AstNode): boolean {
  return getEnumKind(decl) === EnumKind.Numeric;
}

/**
 * Returns the symbols for every enum member.
 */
export function getEnumMemberSymbols(decl: AstNode): readonly AstSymbol[] {
  const out: AstSymbol[] = [];
  for (const m of getEnumMembers(decl)) {
    const sym = (m as unknown as { symbol?: AstSymbol }).symbol;
    if (sym !== undefined) out.push(sym);
  }
  return out;
}

/**
 * Returns true when the enum declaration is `const enum`.
 */
export function isConstEnumDeclaration(decl: AstNode): boolean {
  const modifiers = (decl as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (modifiers === undefined) return false;
  return modifiers.some((m) => m.kind === Kind.ConstKeyword);
}

/**
 * Returns the name text of an enum member declaration.
 */
export function getEnumMemberName(m: AstNode): string | undefined {
  const name = (m as unknown as { name?: AstNode }).name;
  if (name === undefined) return undefined;
  if (name.kind === Kind.Identifier) {
    return (name as unknown as { escapedText?: string }).escapedText;
  }
  if (name.kind === Kind.StringLiteral) {
    return (name as unknown as { text?: string }).text;
  }
  return undefined;
}
