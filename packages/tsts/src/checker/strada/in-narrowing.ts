/**
 * `in`-operator narrowing — `if ("prop" in obj) { ... }`.
 *
 * Ported from Strada `checker.go` — narrowTypeByInKeyword,
 * isInExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const NEVER: Type = { flags: TypeFlags.Never } as unknown as Type;

/**
 * Returns true when the binary expression uses the `in` operator.
 */
export function isInExpression(node: AstNode): boolean {
  if (node.kind !== Kind.BinaryExpression) return false;
  const op = (node as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
  return op === Kind.InKeyword;
}

/**
 * Returns the property-name literal of an in-expression
 * (`"prop" in obj` → "prop").
 */
export function getInExpressionPropertyName(node: AstNode): string | undefined {
  if (!isInExpression(node)) return undefined;
  const left = (node as unknown as { left?: AstNode }).left;
  if (left === undefined) return undefined;
  if (left.kind === Kind.StringLiteral) {
    return (left as unknown as { text?: string }).text;
  }
  if (left.kind === Kind.NoSubstitutionTemplateLiteral) {
    return (left as unknown as { text?: string }).text;
  }
  return undefined;
}

/**
 * Narrows a union type to constituents that have the named property.
 */
export function narrowByInOperator(t: Type, propertyName: string): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    return members?.has(propertyName) === true ? t : NEVER;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const matching = types.filter((c) => {
    const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    return members?.has(propertyName) === true;
  });
  if (matching.length === 0) return NEVER;
  if (matching.length === 1) return matching[0]!;
  return { flags: TypeFlags.Union, types: matching } as unknown as Type;
}

/**
 * Narrows a union type by excluding constituents that have the named
 * property — for the "else" branch of an `in` check.
 */
export function narrowByExcludingIn(t: Type, propertyName: string): Type {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Union) === 0) {
    const members = (t as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    return members?.has(propertyName) === true ? NEVER : t;
  }
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  const remaining = types.filter((c) => {
    const members = (c as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
    return members?.has(propertyName) !== true;
  });
  if (remaining.length === 0) return NEVER;
  if (remaining.length === 1) return remaining[0]!;
  return { flags: TypeFlags.Union, types: remaining } as unknown as Type;
}
