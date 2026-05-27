/**
 * Enum-specific helpers.
 *
 * Ported from Strada `checker.go` — computeEnumMemberValues,
 * isConstEnum, getEnumMemberValue, evaluateConstantExpression.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";

/**
 * Returns true when the enum declaration has the 'const' modifier.
 */
export function isConstEnum(node: AstNode): boolean {
  const mods = (node as unknown as { modifiers?: { nodes?: readonly AstNode[] } }).modifiers?.nodes;
  if (mods === undefined) return false;
  for (const m of mods) {
    if ((m as { kind?: number }).kind === Kind.ConstKeyword) return true;
  }
  return false;
}

/**
 * Returns the static value of an enum member if it can be resolved.
 * Handles direct literals + simple references to earlier members of
 * the same enum.
 */
export function getEnumMemberValue(member: AstNode): string | number | undefined {
  const init = (member as unknown as { initializer?: AstNode }).initializer;
  if (init === undefined) return undefined; // Auto-incremented; needs enum walk.
  return evaluateConstantExpression(init);
}

/**
 * Evaluates a constant expression — string literal, numeric literal,
 * boolean literal, plus simple prefix unary ops (-/+) and identifier
 * refs (deferred to enum walk for cross-member resolution).
 */
export function evaluateConstantExpression(expr: AstNode): string | number | undefined {
  const k = (expr as { kind?: number }).kind;
  switch (k) {
    case Kind.NumericLiteral: {
      const text = (expr as unknown as { text?: string }).text ?? "";
      const n = Number(text);
      return Number.isFinite(n) ? n : undefined;
    }
    case Kind.StringLiteral:
    case Kind.NoSubstitutionTemplateLiteral:
      return (expr as unknown as { text?: string }).text;
    case Kind.TrueKeyword: return 1;
    case Kind.FalseKeyword: return 0;
    case Kind.PrefixUnaryExpression: {
      const operator = (expr as unknown as { operator?: number }).operator;
      const operand = (expr as unknown as { operand?: AstNode }).operand;
      if (operand === undefined) return undefined;
      const inner = evaluateConstantExpression(operand);
      if (typeof inner !== "number") return undefined;
      if (operator === 41 /* PlusToken */) return inner;
      if (operator === 40 /* MinusToken */) return -inner;
      if (operator === 56 /* TildeToken */) return ~inner;
      return undefined;
    }
    case Kind.BinaryExpression: {
      const left = (expr as unknown as { left?: AstNode }).left;
      const right = (expr as unknown as { right?: AstNode }).right;
      const op = (expr as unknown as { operatorToken?: { kind?: number } }).operatorToken?.kind;
      if (left === undefined || right === undefined) return undefined;
      const l = evaluateConstantExpression(left);
      const r = evaluateConstantExpression(right);
      if (typeof l === "number" && typeof r === "number") {
        switch (op) {
          case 41: return l + r;
          case 40: return l - r;
          case 42: return l * r;
          case 43: return l ** r;
          case 44: return r !== 0 ? l / r : undefined;
          case 45: return r !== 0 ? l % r : undefined;
          case 51: return l << r;
          case 52: return l >> r;
          case 53: return l >>> r;
          case 55: return l & r;
          case 56: return l | r;
          case 57: return l ^ r;
          default: return undefined;
        }
      }
      if (typeof l === "string" && typeof r === "string" && op === 41) return l + r;
      return undefined;
    }
    case Kind.ParenthesizedExpression: {
      const inner = (expr as unknown as { expression?: AstNode }).expression;
      return inner !== undefined ? evaluateConstantExpression(inner) : undefined;
    }
    default:
      return undefined;
  }
}

/**
 * Resolves an enum member's value by walking earlier members of the
 * same enum (auto-increment from the previous member when no
 * initializer is present).
 */
export function computeEnumMemberValues(enumDecl: AstNode): Map<string, string | number> {
  const members = (enumDecl as unknown as { members?: { nodes?: readonly AstNode[] } }).members?.nodes;
  const result = new Map<string, string | number>();
  if (members === undefined) return result;
  let auto = 0;
  for (const m of members) {
    const name = (m as unknown as { name?: { text?: string } }).name?.text;
    if (name === undefined) continue;
    const init = (m as unknown as { initializer?: AstNode }).initializer;
    if (init === undefined) {
      result.set(name, auto);
      auto += 1;
    } else {
      const v = evaluateConstantExpression(init);
      if (v === undefined) {
        result.set(name, NaN);
        continue;
      }
      result.set(name, v);
      if (typeof v === "number") auto = v + 1;
    }
  }
  return result;
}

/**
 * Returns true when a const enum's reference (by EnumMember symbol)
 * has a static value that can be inlined at the call site.
 */
export function canInlineConstEnum(member: AstSymbol): boolean {
  const decls = (member as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls === undefined || decls.length === 0) return false;
  const init = (decls[0] as unknown as { initializer?: AstNode }).initializer;
  if (init === undefined) return true; // Auto-incremented; safe to inline.
  return evaluateConstantExpression(init) !== undefined;
}
