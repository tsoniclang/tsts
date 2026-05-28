/**
 * BindingElement handling (entries of binding patterns).
 *
 * Ported from Strada `checker.go` — checkBindingElement,
 * getTypeForBindingElement.
 */

import { Kind } from "../../ast/index.js";
import type { Node as AstNode } from "../../ast/index.js";

/**
 * Returns true when the node is a BindingElement.
 */
export function isBindingElement(node: AstNode): boolean {
  return node.kind === Kind.BindingElement;
}

/**
 * Returns the binding-name of a BindingElement (identifier or
 * nested pattern).
 */
export function getBindingElementName(node: AstNode): AstNode | undefined {
  if (!isBindingElement(node)) return undefined;
  return (node as unknown as { name?: AstNode }).name;
}

/**
 * Returns the property-name of a BindingElement (for renamed
 * destructuring `{ a: b }`).
 */
export function getBindingElementPropertyName(node: AstNode): AstNode | undefined {
  if (!isBindingElement(node)) return undefined;
  return (node as unknown as { propertyName?: AstNode }).propertyName;
}

/**
 * Returns the initializer (default value) of a BindingElement.
 */
export function getBindingElementInitializer(node: AstNode): AstNode | undefined {
  if (!isBindingElement(node)) return undefined;
  return (node as unknown as { initializer?: AstNode }).initializer;
}

/**
 * Returns true when the BindingElement is a rest element (`...rest`).
 */
export function isRestBindingElement(node: AstNode): boolean {
  if (!isBindingElement(node)) return false;
  return (node as unknown as { dotDotDotToken?: AstNode }).dotDotDotToken !== undefined;
}

/**
 * Returns true when the BindingElement has a default value.
 */
export function hasBindingElementDefault(node: AstNode): boolean {
  return getBindingElementInitializer(node) !== undefined;
}

/**
 * Returns true when the BindingElement's name is a nested pattern.
 */
export function hasNestedBindingPattern(node: AstNode): boolean {
  const name = getBindingElementName(node);
  if (name === undefined) return false;
  return (
    name.kind === Kind.ObjectBindingPattern ||
    name.kind === Kind.ArrayBindingPattern
  );
}

/**
 * Returns the source property name a BindingElement binds from —
 * the propertyName if renamed, else the binding-name.
 */
export function getSourcePropertyName(node: AstNode): string | undefined {
  const propertyName = getBindingElementPropertyName(node);
  const target = propertyName ?? getBindingElementName(node);
  if (target === undefined || target.kind !== Kind.Identifier) return undefined;
  return (target as unknown as { escapedText?: string }).escapedText;
}

/**
 * Returns the local-binding name (the new name introduced).
 */
export function getLocalBindingName(node: AstNode): string | undefined {
  const name = getBindingElementName(node);
  if (name === undefined || name.kind !== Kind.Identifier) return undefined;
  return (name as unknown as { escapedText?: string }).escapedText;
}
