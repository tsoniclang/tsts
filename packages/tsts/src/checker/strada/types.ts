/**
 * Type-from-TypeNode resolution.
 *
 * Ported from Strada `checker.go` — the getTypeFrom* family that
 * builds checker Type records from parsed TypeNodes. Routes through
 * the type-symbol back-references the binder attaches.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import type { CheckerOps } from "./index.js";

export function getTypeFromTypeNode(c: CheckerOps, node: AstNode): Type {
  return getTypeFromTypeNodeWorker(c, node);
}

export function getTypeFromTypeNodeWorker(c: CheckerOps, node: AstNode): Type {
  const k = (node as { kind?: number }).kind;
  switch (k) {
    case Kind.AnyKeyword: return { flags: 1 << 0 } as unknown as Type;
    case Kind.UnknownKeyword: return { flags: 1 << 1 } as unknown as Type;
    case Kind.StringKeyword: return { flags: 1 << 2 } as unknown as Type;
    case Kind.NumberKeyword: return { flags: 1 << 3 } as unknown as Type;
    case Kind.BooleanKeyword: return { flags: 1 << 4 } as unknown as Type;
    case Kind.BigIntKeyword: return { flags: 1 << 6 } as unknown as Type;
    case Kind.VoidKeyword: return { flags: 1 << 14 } as unknown as Type;
    case Kind.UndefinedKeyword: return { flags: 1 << 15 } as unknown as Type;
    case Kind.NullKeyword: return { flags: 1 << 16 } as unknown as Type;
    case Kind.NeverKeyword: return { flags: 1 << 17 } as unknown as Type;
    case Kind.SymbolKeyword: return { flags: 1 << 12 } as unknown as Type;
    case Kind.ObjectKeyword: return { flags: 1 << 26 } as unknown as Type;
    case Kind.ArrayType: return getTypeFromArrayOrTupleTypeNode(c, node);
    case Kind.TupleType: return getTypeFromArrayOrTupleTypeNode(c, node);
    case Kind.UnionType: return getTypeFromUnionTypeNode(c, node);
    case Kind.IntersectionType: return getTypeFromIntersectionTypeNode(c, node);
    case Kind.ConditionalType: return getTypeFromConditionalTypeNode(c, node);
    case Kind.MappedType: return getTypeFromMappedTypeNode(c, node);
    case Kind.LiteralType: return getTypeFromLiteralTypeNode(c, node);
    case Kind.IndexedAccessType: return getTypeFromIndexedAccessTypeNode(c, node);
    case Kind.TypeReference: return getTypeFromTypeReference(c, node);
    case Kind.NamedTupleMember: return getTypeFromNamedTupleTypeNode(c, node);
    case Kind.OptionalType:
    case Kind.RestType: return getTypeFromOptionalOrRestTypeNode(c, node);
    case Kind.ThisType: return { flags: 1 << 18 } as unknown as Type;
    case Kind.TemplateLiteralType: return { flags: 1 << 27 } as unknown as Type;
    case Kind.TypeOperator: return getTypeFromTypeOperatorNode(c, node);
    case Kind.TypeQuery: return { flags: 1 << 0 } as unknown as Type;
    case Kind.TypeLiteral:
    case Kind.FunctionType:
    case Kind.ConstructorType:
      return { flags: 1 << 19 } as unknown as Type;
    default: return { flags: 1 << 0 } as unknown as Type;
  }
}

export function getTypeFromArrayOrTupleTypeNode(c: CheckerOps, node: AstNode): Type {
  const k = (node as { kind?: number }).kind;
  if (k === Kind.ArrayType) {
    const elementType = (node as unknown as { elementType?: AstNode }).elementType;
    return {
      flags: 1 << 19,
      elementType: elementType !== undefined ? getTypeFromTypeNode(c, elementType) : undefined,
    } as unknown as Type;
  }
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements?.nodes;
  return {
    flags: 1 << 19,
    typeArguments: elements !== undefined ? elements.map((e) => getTypeFromTypeNode(c, e)) : [],
  } as unknown as Type;
}

export function getTypeFromUnionTypeNode(c: CheckerOps, node: AstNode): Type {
  const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
  return {
    flags: 1 << 20,
    types: types !== undefined ? types.map((t) => getTypeFromTypeNode(c, t)) : [],
  } as unknown as Type;
}

export function getTypeFromIntersectionTypeNode(c: CheckerOps, node: AstNode): Type {
  const types = (node as unknown as { types?: { nodes?: readonly AstNode[] } }).types?.nodes;
  return {
    flags: 1 << 21,
    types: types !== undefined ? types.map((t) => getTypeFromTypeNode(c, t)) : [],
  } as unknown as Type;
}

export function getTypeFromConditionalTypeNode(c: CheckerOps, node: AstNode): Type {
  const checkType = (node as unknown as { checkType?: AstNode }).checkType;
  const extendsType = (node as unknown as { extendsType?: AstNode }).extendsType;
  const trueType = (node as unknown as { trueType?: AstNode }).trueType;
  const falseType = (node as unknown as { falseType?: AstNode }).falseType;
  return {
    flags: 1 << 24,
    checkType: checkType !== undefined ? getTypeFromTypeNode(c, checkType) : undefined,
    extendsType: extendsType !== undefined ? getTypeFromTypeNode(c, extendsType) : undefined,
    trueType: trueType !== undefined ? getTypeFromTypeNode(c, trueType) : undefined,
    falseType: falseType !== undefined ? getTypeFromTypeNode(c, falseType) : undefined,
  } as unknown as Type;
}

export function getTypeFromMappedTypeNode(_c: CheckerOps, _node: AstNode): Type {
  return { flags: 1 << 19 } as unknown as Type;
}

export function getTypeFromIndexedAccessTypeNode(c: CheckerOps, node: AstNode): Type {
  const objectType = (node as unknown as { objectType?: AstNode }).objectType;
  const indexType = (node as unknown as { indexType?: AstNode }).indexType;
  return {
    flags: 1 << 23,
    objectType: objectType !== undefined ? getTypeFromTypeNode(c, objectType) : undefined,
    indexType: indexType !== undefined ? getTypeFromTypeNode(c, indexType) : undefined,
  } as unknown as Type;
}

export function getTypeFromLiteralTypeNode(_c: CheckerOps, node: AstNode): Type {
  const literal = (node as unknown as { literal?: { kind?: number; text?: string } }).literal;
  if (literal === undefined) return { flags: 1 << 0 } as unknown as Type;
  switch (literal.kind) {
    case Kind.StringLiteral: return { flags: 1 << 7, value: literal.text } as unknown as Type;
    case Kind.NumericLiteral: return { flags: 1 << 8, value: Number(literal.text ?? "0") } as unknown as Type;
    case Kind.TrueKeyword: return { flags: 1 << 9, intrinsicName: "true" } as unknown as Type;
    case Kind.FalseKeyword: return { flags: 1 << 9, intrinsicName: "false" } as unknown as Type;
    case Kind.NullKeyword: return { flags: 1 << 16 } as unknown as Type;
    default: return { flags: 1 << 0 } as unknown as Type;
  }
}

export function getTypeFromTypeReference(c: CheckerOps, node: AstNode): Type {
  const typeName = (node as unknown as { typeName?: AstNode }).typeName;
  const symbol = typeName !== undefined ? c.getSymbolAtLocation(typeName) : undefined;
  const typeArgNodes = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
  const typeArguments = typeArgNodes !== undefined ? typeArgNodes.map((t) => getTypeFromTypeNode(c, t)) : [];
  if (symbol === undefined) return { flags: 1 << 19, typeArguments } as unknown as Type;
  const flags = (symbol as unknown as { flags?: number }).flags ?? 0;
  if ((flags & 524288) !== 0) return getTypeFromTypeAliasReference(c, node, symbol);
  if ((flags & 96) !== 0) return getTypeFromClassOrInterfaceReference(c, node, symbol);
  return { flags: 1 << 19, symbol, typeArguments } as unknown as Type;
}

export function getTypeFromTypeAliasReference(c: CheckerOps, node: AstNode, symbol: AstSymbol): Type {
  const typeArgNodes = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
  const typeArguments = typeArgNodes !== undefined ? typeArgNodes.map((t) => getTypeFromTypeNode(c, t)) : undefined;
  return c.getTypeAliasInstantiation(symbol, typeArguments);
}

export function getTypeFromClassOrInterfaceReference(c: CheckerOps, node: AstNode, symbol: AstSymbol): Type {
  const typeArgNodes = (node as unknown as { typeArguments?: { nodes?: readonly AstNode[] } }).typeArguments?.nodes;
  const typeArguments = typeArgNodes !== undefined ? typeArgNodes.map((t) => getTypeFromTypeNode(c, t)) : [];
  return c.createTypeReference(c.getDeclaredTypeOfClassOrInterface(symbol), typeArguments);
}

export function getTypeFromNamedTupleTypeNode(c: CheckerOps, node: AstNode): Type {
  const type = (node as unknown as { type?: AstNode }).type;
  return type !== undefined ? getTypeFromTypeNode(c, type) : { flags: 1 << 0 } as unknown as Type;
}

export function getTypeFromOptionalOrRestTypeNode(c: CheckerOps, node: AstNode): Type {
  const type = (node as unknown as { type?: AstNode }).type;
  return type !== undefined ? getTypeFromTypeNode(c, type) : { flags: 1 << 0 } as unknown as Type;
}

export function getTypeFromTypeOperatorNode(c: CheckerOps, node: AstNode): Type {
  const operand = (node as unknown as { type?: AstNode }).type;
  return operand !== undefined ? getTypeFromTypeNode(c, operand) : { flags: 1 << 0 } as unknown as Type;
}

// ---------------------------------------------------------------------------
// getTypeOf*  helpers
// ---------------------------------------------------------------------------

export function getTypeOfSymbol(c: CheckerOps, symbol: AstSymbol): Type {
  const cached = (symbol as unknown as { type?: Type }).type;
  if (cached !== undefined) return cached;
  return getTypeOfVariableOrParameterOrPropertyWorker(c, symbol);
}

export function getTypeOfVariableOrParameterOrPropertyWorker(c: CheckerOps, symbol: AstSymbol): Type {
  const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls !== undefined) {
    for (const d of decls) {
      const typeNode = (d as unknown as { type?: AstNode }).type;
      if (typeNode !== undefined) return getTypeFromTypeNode(c, typeNode);
    }
  }
  return { flags: 1 << 0 } as unknown as Type;
}

export function getTypeOfEnumMember(c: CheckerOps, symbol: AstSymbol): Type {
  const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
  if (decls !== undefined && decls.length > 0) {
    const init = (decls[0] as unknown as { initializer?: AstNode }).initializer;
    if (init !== undefined) {
      const k = (init as { kind?: number }).kind;
      if (k === Kind.NumericLiteral) return { flags: 1 << 8, value: Number((init as unknown as { text?: string }).text ?? "0") } as unknown as Type;
      if (k === Kind.StringLiteral) return { flags: 1 << 7, value: (init as unknown as { text?: string }).text } as unknown as Type;
    }
  }
  void c;
  return { flags: 1 << 5 } as unknown as Type;
}

export function getDeclaredTypeOfSymbol(c: CheckerOps, symbol: AstSymbol): Type {
  const flags = (symbol as unknown as { flags?: number }).flags ?? 0;
  if ((flags & 32) !== 0 || (flags & 64) !== 0) return c.getDeclaredTypeOfClassOrInterface(symbol);
  if ((flags & 384) !== 0) return { flags: 1 << 5, symbol } as unknown as Type;
  if ((flags & 8) !== 0) return getTypeOfEnumMember(c, symbol);
  if ((flags & 524288) !== 0) {
    const decls = (symbol as unknown as { declarations?: readonly AstNode[] }).declarations;
    if (decls !== undefined && decls.length > 0) {
      const typeNode = (decls[0] as unknown as { type?: AstNode }).type;
      if (typeNode !== undefined) return getTypeFromTypeNode(c, typeNode);
    }
    return { flags: 1 << 0 } as unknown as Type;
  }
  if ((flags & 262144) !== 0) return { flags: 1 << 18, symbol } as unknown as Type;
  return { flags: 1 << 0 } as unknown as Type;
}

export function getDeclaredTypeOfClassOrInterface(_c: CheckerOps, symbol: AstSymbol): Type {
  const cached = (symbol as unknown as { declaredType?: Type }).declaredType;
  if (cached !== undefined) return cached;
  return { flags: 1 << 19, symbol } as unknown as Type;
}

export function createTypeReference(_c: CheckerOps, target: Type, typeArguments: readonly Type[] | undefined): Type {
  return {
    flags: 1 << 19,
    target,
    typeArguments: typeArguments ?? [],
  } as unknown as Type;
}

export function getTypeAliasInstantiation(c: CheckerOps, symbol: AstSymbol, typeArguments: readonly Type[] | undefined): Type {
  const base = getDeclaredTypeOfSymbol(c, symbol);
  if (typeArguments === undefined || typeArguments.length === 0) return base;
  return { ...(base as object), typeArguments } as unknown as Type;
}
