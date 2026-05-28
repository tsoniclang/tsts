/**
 * Keyword type-node handling (`string`, `number`, `boolean`, etc.).
 *
 * Ported from Strada `checker.go` — getTypeFromKeywordTypeNode.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

/**
 * Returns true when the node is one of the keyword type-nodes.
 */
export function isKeywordTypeNode(node: AstNode): boolean {
  switch (node.kind) {
    case Kind.AnyKeyword:
    case Kind.UnknownKeyword:
    case Kind.NumberKeyword:
    case Kind.BigIntKeyword:
    case Kind.ObjectKeyword:
    case Kind.BooleanKeyword:
    case Kind.StringKeyword:
    case Kind.SymbolKeyword:
    case Kind.VoidKeyword:
    case Kind.UndefinedKeyword:
    case Kind.NullKeyword:
    case Kind.NeverKeyword:
    case Kind.IntrinsicKeyword:
      return true;
    default:
      return false;
  }
}

/**
 * Returns the TypeFlags bit for a keyword type-node Kind.
 */
export function getKeywordTypeFlag(kind: number): number | undefined {
  switch (kind) {
    case Kind.AnyKeyword: return TypeFlags.Any;
    case Kind.UnknownKeyword: return TypeFlags.Unknown;
    case Kind.NumberKeyword: return TypeFlags.Number;
    case Kind.BigIntKeyword: return TypeFlags.BigInt;
    case Kind.BooleanKeyword: return TypeFlags.Boolean;
    case Kind.StringKeyword: return TypeFlags.String;
    case Kind.SymbolKeyword: return TypeFlags.ESSymbol;
    case Kind.VoidKeyword: return TypeFlags.Void;
    case Kind.UndefinedKeyword: return TypeFlags.Undefined;
    case Kind.NullKeyword: return TypeFlags.Null;
    case Kind.NeverKeyword: return TypeFlags.Never;
    case Kind.ObjectKeyword: return TypeFlags.Object;
    default: return undefined;
  }
}

/**
 * Returns the Type for a keyword type-node.
 */
export function getKeywordType(node: AstNode): Type | undefined {
  if (!isKeywordTypeNode(node)) return undefined;
  const flag = getKeywordTypeFlag(node.kind);
  if (flag === undefined) return undefined;
  return { flags: flag } as unknown as Type;
}

/**
 * Returns the keyword-type display name.
 */
export function getKeywordTypeName(kind: number): string {
  switch (kind) {
    case Kind.AnyKeyword: return "any";
    case Kind.UnknownKeyword: return "unknown";
    case Kind.NumberKeyword: return "number";
    case Kind.BigIntKeyword: return "bigint";
    case Kind.BooleanKeyword: return "boolean";
    case Kind.StringKeyword: return "string";
    case Kind.SymbolKeyword: return "symbol";
    case Kind.VoidKeyword: return "void";
    case Kind.UndefinedKeyword: return "undefined";
    case Kind.NullKeyword: return "null";
    case Kind.NeverKeyword: return "never";
    case Kind.ObjectKeyword: return "object";
    default: return "(unknown)";
  }
}

/**
 * Returns true when the keyword type is a "top type" (any/unknown).
 */
export function isTopKeywordType(kind: number): boolean {
  return kind === Kind.AnyKeyword || kind === Kind.UnknownKeyword;
}

/**
 * Returns true when the keyword type is a "bottom type" (never).
 */
export function isBottomKeywordType(kind: number): boolean {
  return kind === Kind.NeverKeyword;
}
