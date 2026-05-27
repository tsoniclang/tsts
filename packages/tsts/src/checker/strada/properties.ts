/**
 * Property + index queries.
 *
 * Ported from Strada `checker.go` — the getPropertyOf* family.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol, SymbolTable } from "../../ast/index.js";
import type { Type } from "../types.js";

export function getPropertyOfType(t: Type, name: string): AstSymbol | undefined {
  const props = (t as unknown as { properties?: SymbolTable }).properties;
  if (props !== undefined) {
    const direct = props.get(name);
    if (direct !== undefined) return direct;
  }
  const members = (t as unknown as { symbol?: { members?: SymbolTable } }).symbol?.members;
  return members?.get(name);
}

export function getPropertyOfObjectType(t: Type, name: string): AstSymbol | undefined {
  return getPropertyOfType(t, name);
}

export function getPropertyOfUnionOrIntersectionType(t: Type, name: string): AstSymbol | undefined {
  const types = (t as unknown as { types?: readonly Type[] }).types;
  if (types === undefined) return undefined;
  for (const sub of types) {
    const found = getPropertyOfType(sub, name);
    if (found !== undefined) return found;
  }
  return undefined;
}

export function getPropertyOfVariable(symbol: AstSymbol, name: string): AstSymbol | undefined {
  const members = (symbol as unknown as { members?: SymbolTable }).members;
  return members?.get(name);
}

export function getPropertyNameFromBindingElement(node: AstNode): string | undefined {
  const propertyName = (node as unknown as { propertyName?: { text?: string } }).propertyName;
  if (propertyName?.text !== undefined) return propertyName.text;
  const name = (node as unknown as { name?: { text?: string } }).name;
  return name?.text;
}

export function getPropertyNameFromIndex(node: AstNode): string | undefined {
  const k = (node as { kind?: number }).kind;
  if (k === Kind.StringLiteral || k === Kind.NoSubstitutionTemplateLiteral ||
      k === Kind.NumericLiteral || k === Kind.Identifier) {
    return (node as unknown as { text?: string }).text;
  }
  return undefined;
}

export function getTypeOfPropertyOfType(t: Type, name: string): Type | undefined {
  const prop = getPropertyOfType(t, name);
  if (prop === undefined) return undefined;
  return (prop as unknown as { type?: Type }).type;
}
