/**
 * Type → display-string renderer.
 *
 * Ported from Strada `printer.go` (within `checker`) — typeToString,
 * typeToDisplayParts. Used by diagnostics to render expected /
 * actual type names.
 */

import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Renders a type as a TS-style display string.
 */
export function typeToString(t: Type): string {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return "any";
  if ((flags & TypeFlags.Unknown) !== 0) return "unknown";
  if ((flags & TypeFlags.Never) !== 0) return "never";
  if ((flags & TypeFlags.Void) !== 0) return "void";
  if ((flags & TypeFlags.Undefined) !== 0) return "undefined";
  if ((flags & TypeFlags.Null) !== 0) return "null";
  if ((flags & TypeFlags.ESSymbol) !== 0) return "symbol";
  if ((flags & TypeFlags.UniqueESSymbol) !== 0) return "unique symbol";
  if ((flags & TypeFlags.String) !== 0) return "string";
  if ((flags & TypeFlags.Number) !== 0) return "number";
  if ((flags & TypeFlags.BigInt) !== 0) return "bigint";
  if ((flags & TypeFlags.Boolean) !== 0) return "boolean";
  if ((flags & TypeFlags.StringLiteral) !== 0) {
    const v = (t as unknown as { value?: string }).value ?? "";
    return JSON.stringify(v);
  }
  if ((flags & TypeFlags.NumberLiteral) !== 0) {
    const v = (t as unknown as { value?: number }).value ?? 0;
    return String(v);
  }
  if ((flags & TypeFlags.BooleanLiteral) !== 0) {
    const v = (t as unknown as { value?: boolean }).value ?? false;
    return v ? "true" : "false";
  }
  if ((flags & TypeFlags.BigIntLiteral) !== 0) {
    const v = (t as unknown as { value?: string }).value ?? "0";
    return v + "n";
  }
  if ((flags & TypeFlags.Union) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.map(typeToString).join(" | ");
  }
  if ((flags & TypeFlags.Intersection) !== 0) {
    const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
    return types.map(typeToString).join(" & ");
  }
  if ((flags & TypeFlags.TypeParameter) !== 0) {
    const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
    return sym?.name ?? "T";
  }
  if ((flags & TypeFlags.Object) !== 0) {
    const sym = (t as unknown as { symbol?: { name?: string } }).symbol;
    const name = sym?.name ?? "object";
    const args = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
    if (args !== undefined && args.length > 0) {
      return name + "<" + args.map(typeToString).join(", ") + ">";
    }
    return name;
  }
  if ((flags & TypeFlags.Index) !== 0) {
    const operand = (t as unknown as { type?: Type }).type;
    return operand !== undefined ? "keyof " + typeToString(operand) : "keyof unknown";
  }
  if ((flags & TypeFlags.IndexedAccess) !== 0) {
    const obj = (t as unknown as { objectType?: Type }).objectType;
    const idx = (t as unknown as { indexType?: Type }).indexType;
    if (obj !== undefined && idx !== undefined) {
      return typeToString(obj) + "[" + typeToString(idx) + "]";
    }
    return "unknown[unknown]";
  }
  if ((flags & TypeFlags.Conditional) !== 0) {
    const check = (t as unknown as { checkType?: Type }).checkType;
    const ext = (t as unknown as { extendsType?: Type }).extendsType;
    const tr = (t as unknown as { trueType?: Type }).trueType;
    const fa = (t as unknown as { falseType?: Type }).falseType;
    if (check !== undefined && ext !== undefined && tr !== undefined && fa !== undefined) {
      return typeToString(check) + " extends " + typeToString(ext) +
        " ? " + typeToString(tr) + " : " + typeToString(fa);
    }
    return "conditional";
  }
  return "unknown";
}

/**
 * Renders a list of types as a parenthesized argument list.
 */
export function typesToArgumentList(types: readonly Type[]): string {
  return types.map(typeToString).join(", ");
}

/**
 * Renders a type with an enclosing parenthesis when needed for
 * union/intersection contexts.
 */
export function typeToStringParenthesized(t: Type): string {
  const flags = (t as { flags?: number }).flags ?? 0;
  const needsParens = (flags & (TypeFlags.Union | TypeFlags.Intersection)) !== 0;
  return needsParens ? "(" + typeToString(t) + ")" : typeToString(t);
}
