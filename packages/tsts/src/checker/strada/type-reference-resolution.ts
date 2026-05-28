/**
 * TypeReference → Type resolution.
 *
 * Ported from Strada `checker.go` — getTypeFromTypeReference,
 * resolveTypeReferenceToSymbol, getTypeReferenceType.
 */

import { Kind, SymbolFlags } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns the resolved symbol of a TypeReference, if attached.
 */
export function getTypeReferenceSymbol(node: AstNode): AstSymbol | undefined {
  if (node.kind !== Kind.TypeReference) return undefined;
  const typeName = (node as unknown as { typeName?: AstNode }).typeName;
  if (typeName === undefined) return undefined;
  return (typeName as unknown as { symbol?: AstSymbol }).symbol;
}

/**
 * Returns the type a TypeReference resolves to. Dispatches by the
 * referenced symbol's flags: type-alias → alias type; class/interface
 * → declared type; type-parameter → parameter type.
 */
export function resolveTypeReference(node: AstNode): Type {
  const sym = getTypeReferenceSymbol(node);
  if (sym === undefined) return ANY;
  const flags = (sym as unknown as { flags?: number }).flags ?? 0;

  if ((flags & SymbolFlags.TypeAlias) !== 0) {
    return resolveAliasReference(sym);
  }
  if ((flags & (SymbolFlags.Class | SymbolFlags.Interface)) !== 0) {
    return resolveClassOrInterfaceReference(sym);
  }
  if ((flags & SymbolFlags.TypeParameter) !== 0) {
    return resolveTypeParameterReference(sym);
  }
  if ((flags & SymbolFlags.Enum) !== 0) {
    return resolveEnumReference(sym);
  }
  return ANY;
}

/**
 * Resolves a type-alias reference to its aliased type.
 */
export function resolveAliasReference(sym: AstSymbol): Type {
  const aliased = (sym as unknown as { aliasedType?: Type }).aliasedType;
  return aliased ?? ANY;
}

/**
 * Resolves a class/interface reference to its declared type.
 */
export function resolveClassOrInterfaceReference(sym: AstSymbol): Type {
  const declared = (sym as unknown as { declaredType?: Type }).declaredType;
  return declared ?? {
    flags: TypeFlags.Object,
    symbol: sym,
  } as unknown as Type;
}

/**
 * Resolves a type-parameter reference to its parameter type.
 */
export function resolveTypeParameterReference(sym: AstSymbol): Type {
  return {
    flags: TypeFlags.TypeParameter,
    symbol: sym,
  } as unknown as Type;
}

/**
 * Resolves an enum reference to its enum type.
 */
export function resolveEnumReference(sym: AstSymbol): Type {
  return {
    flags: TypeFlags.Object,
    symbol: sym,
    isEnum: true,
  } as unknown as Type;
}

/**
 * Returns true when the type reference is to a built-in global type
 * (Array, Promise, Map, etc.) — these need TypeRegistry lookup.
 */
export function isGlobalTypeReference(node: AstNode): boolean {
  if (node.kind !== Kind.TypeReference) return false;
  const typeName = (node as unknown as { typeName?: AstNode }).typeName;
  if (typeName === undefined || typeName.kind !== Kind.Identifier) return false;
  const text = (typeName as unknown as { escapedText?: string }).escapedText ?? "";
  return ["Array", "ReadonlyArray", "Promise", "Map", "Set", "ReadonlyMap",
    "ReadonlySet", "WeakMap", "WeakSet", "Record", "Partial", "Required",
    "Readonly", "Pick", "Omit", "Exclude", "Extract", "NonNullable"].includes(text);
}
