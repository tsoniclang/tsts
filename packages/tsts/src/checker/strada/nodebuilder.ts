/**
 * Type → TypeNode reverse builder.
 *
 * Ported from Strada `checker/nodebuilder.go` — builds AST TypeNode
 * structures from in-memory Type records. Used by declaration emit
 * and language-service hover.
 *
 * Conservative bodies for compound types; full ports require the
 * NodeFactory wiring.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

export function typeToTypeNode(t: Type): AstNode {
  const flags = (t as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return { kind: Kind.AnyKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Unknown) !== 0) return { kind: Kind.UnknownKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.String) !== 0) return { kind: Kind.StringKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Number) !== 0) return { kind: Kind.NumberKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Boolean) !== 0) return { kind: Kind.BooleanKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.BigInt) !== 0) return { kind: Kind.BigIntKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.ESSymbol) !== 0) return { kind: Kind.SymbolKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Void) !== 0) return { kind: Kind.VoidKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Undefined) !== 0) return { kind: Kind.UndefinedKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Null) !== 0) return { kind: Kind.NullKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Never) !== 0) return { kind: Kind.NeverKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.NonPrimitive) !== 0) return { kind: Kind.ObjectKeyword } as unknown as AstNode;
  if ((flags & TypeFlags.Union) !== 0) return unionTypeToNode(t);
  if ((flags & TypeFlags.Intersection) !== 0) return intersectionTypeToNode(t);
  if ((flags & TypeFlags.Object) !== 0) return objectTypeToNode(t);
  if ((flags & TypeFlags.TypeParameter) !== 0) return typeParameterToNode(t);
  if ((flags & TypeFlags.Conditional) !== 0) return conditionalTypeToNode(t);
  if ((flags & TypeFlags.IndexedAccess) !== 0) return indexedAccessTypeToNode(t);
  if ((flags & TypeFlags.StringLiteral) !== 0) return stringLiteralToNode(t);
  if ((flags & TypeFlags.NumberLiteral) !== 0) return numberLiteralToNode(t);
  if ((flags & TypeFlags.BooleanLiteral) !== 0) return booleanLiteralToNode(t);
  return { kind: Kind.AnyKeyword } as unknown as AstNode;
}

function unionTypeToNode(t: Type): AstNode {
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return {
    kind: Kind.UnionType,
    types: { nodes: types.map(typeToTypeNode) },
  } as unknown as AstNode;
}

function intersectionTypeToNode(t: Type): AstNode {
  const types = (t as unknown as { types?: readonly Type[] }).types ?? [];
  return {
    kind: Kind.IntersectionType,
    types: { nodes: types.map(typeToTypeNode) },
  } as unknown as AstNode;
}

function objectTypeToNode(t: Type): AstNode {
  // If the object type has typeArguments, render as TypeReference
  // with the symbol's name.
  const symbol = (t as unknown as { symbol?: { name?: string } }).symbol;
  const typeArguments = (t as unknown as { typeArguments?: readonly Type[] }).typeArguments;
  const elementType = (t as unknown as { elementType?: Type }).elementType;
  if (elementType !== undefined) {
    return {
      kind: Kind.ArrayType,
      elementType: typeToTypeNode(elementType),
    } as unknown as AstNode;
  }
  if (symbol?.name !== undefined) {
    return {
      kind: Kind.TypeReference,
      typeName: { kind: Kind.Identifier, text: symbol.name },
      typeArguments: typeArguments !== undefined
        ? { nodes: typeArguments.map(typeToTypeNode) }
        : undefined,
    } as unknown as AstNode;
  }
  return { kind: Kind.TypeLiteral } as unknown as AstNode;
}

function typeParameterToNode(t: Type): AstNode {
  const symbol = (t as unknown as { symbol?: { name?: string } }).symbol;
  return {
    kind: Kind.TypeReference,
    typeName: { kind: Kind.Identifier, text: symbol?.name ?? "T" },
  } as unknown as AstNode;
}

function conditionalTypeToNode(t: Type): AstNode {
  const checkType = (t as unknown as { checkType?: Type }).checkType;
  const extendsType = (t as unknown as { extendsType?: Type }).extendsType;
  const trueType = (t as unknown as { trueType?: Type }).trueType;
  const falseType = (t as unknown as { falseType?: Type }).falseType;
  return {
    kind: Kind.ConditionalType,
    checkType: checkType !== undefined ? typeToTypeNode(checkType) : undefined,
    extendsType: extendsType !== undefined ? typeToTypeNode(extendsType) : undefined,
    trueType: trueType !== undefined ? typeToTypeNode(trueType) : undefined,
    falseType: falseType !== undefined ? typeToTypeNode(falseType) : undefined,
  } as unknown as AstNode;
}

function indexedAccessTypeToNode(t: Type): AstNode {
  const objectType = (t as unknown as { objectType?: Type }).objectType;
  const indexType = (t as unknown as { indexType?: Type }).indexType;
  return {
    kind: Kind.IndexedAccessType,
    objectType: objectType !== undefined ? typeToTypeNode(objectType) : undefined,
    indexType: indexType !== undefined ? typeToTypeNode(indexType) : undefined,
  } as unknown as AstNode;
}

function stringLiteralToNode(t: Type): AstNode {
  const value = (t as unknown as { value?: string }).value ?? "";
  return {
    kind: Kind.LiteralType,
    literal: { kind: Kind.StringLiteral, text: value },
  } as unknown as AstNode;
}

function numberLiteralToNode(t: Type): AstNode {
  const value = (t as unknown as { value?: number }).value ?? 0;
  return {
    kind: Kind.LiteralType,
    literal: { kind: Kind.NumericLiteral, text: `${value}` },
  } as unknown as AstNode;
}

function booleanLiteralToNode(t: Type): AstNode {
  const intrinsicName = (t as unknown as { intrinsicName?: string }).intrinsicName;
  return {
    kind: Kind.LiteralType,
    literal: { kind: intrinsicName === "true" ? Kind.TrueKeyword : Kind.FalseKeyword },
  } as unknown as AstNode;
}

/**
 * Builds a TypeNode for the symbol's declared type. Convenience entry
 * for declaration emit.
 */
export function symbolTypeToNode(symbol: { type?: Type }): AstNode {
  return symbol.type !== undefined ? typeToTypeNode(symbol.type) : { kind: Kind.AnyKeyword } as unknown as AstNode;
}
