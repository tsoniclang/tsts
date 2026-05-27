/**
 * Object-destructuring assignment / declaration.
 *
 * Ported from Strada `checker.go` — checkObjectLiteralAssignment,
 * getTypeForBindingElementFromObject.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode, Symbol as AstSymbol } from "../../ast/index.js";
import type { Type } from "../types.js";
import { TypeFlags } from "../types.js";

const ANY: Type = { flags: TypeFlags.Any } as unknown as Type;

/**
 * Returns true when the node is an object binding pattern.
 */
export function isObjectBindingPattern(node: AstNode): boolean {
  return node.kind === Kind.ObjectBindingPattern;
}

/**
 * Returns the binding elements of an ObjectBindingPattern.
 */
export function getObjectBindingElements(node: AstNode): readonly AstNode[] {
  if (!isObjectBindingPattern(node)) return [];
  const elements = (node as unknown as { elements?: { nodes?: readonly AstNode[] } }).elements;
  return elements?.nodes ?? [];
}

/**
 * Returns the property name being bound — `{ a: b }` → "a"
 * (the source name).
 */
export function getBindingPropertyName(element: AstNode): string | undefined {
  if (element.kind !== Kind.BindingElement) return undefined;
  const propertyName = (element as unknown as { propertyName?: AstNode }).propertyName;
  if (propertyName !== undefined) {
    if (propertyName.kind === Kind.Identifier) {
      return (propertyName as unknown as { escapedText?: string }).escapedText;
    }
    if (propertyName.kind === Kind.StringLiteral) {
      return (propertyName as unknown as { text?: string }).text;
    }
  }
  // No propertyName means propertyName == bindingName.
  const name = (element as unknown as { name?: AstNode }).name;
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the type at the given property of an object source type.
 */
export function getTypeAtObjectProperty(
  sourceType: Type,
  propertyName: string,
): Type {
  const flags = (sourceType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Any) !== 0) return sourceType;
  const members = (sourceType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  const propSym = members?.get(propertyName);
  if (propSym === undefined) return ANY;
  return (propSym as unknown as { type?: Type }).type ?? ANY;
}

/**
 * Returns true when the binding element is a rest pattern `...rest`.
 */
export function isRestProperty(element: AstNode): boolean {
  if (element.kind !== Kind.BindingElement) return false;
  return (element as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}

/**
 * Returns the names being bound (excluding rest).
 */
export function getBoundPropertyNames(node: AstNode): readonly string[] {
  const out: string[] = [];
  for (const e of getObjectBindingElements(node)) {
    if (isRestProperty(e)) continue;
    const name = getBindingPropertyName(e);
    if (name !== undefined) out.push(name);
  }
  return out;
}

/**
 * Returns the rest-property binding element, if any.
 */
export function getRestBindingElement(node: AstNode): AstNode | undefined {
  return getObjectBindingElements(node).find(isRestProperty);
}

/**
 * Returns the rest-property type — the source type minus the bound
 * properties.
 */
export function getRestPropertyType(
  sourceType: Type,
  excludedNames: readonly string[],
): Type {
  const flags = (sourceType as { flags?: number }).flags ?? 0;
  if ((flags & TypeFlags.Object) === 0) return sourceType;
  const members = (sourceType as unknown as { symbol?: { members?: Map<string, AstSymbol> } }).symbol?.members;
  if (members === undefined) return sourceType;
  const exclude = new Set(excludedNames);
  const restMembers = new Map<string, AstSymbol>();
  for (const [name, sym] of members) {
    if (!exclude.has(name)) restMembers.set(name, sym);
  }
  return {
    flags: TypeFlags.Object,
    symbol: { name: "__rest", members: restMembers },
  } as unknown as Type;
}
